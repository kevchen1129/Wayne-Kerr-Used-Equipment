import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isSpam } from "@/utils/spamDetection";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function getNotificationEmail() {
  return process.env.CONTACT_NOTIFICATION_EMAIL || "kevchen1129@gmail.com";
}

function getSenderEmail() {
  return (
    process.env.RESEND_FROM_EMAIL ||
    "Wayne Kerr Refurbished Store <onboarding@resend.dev>"
  );
}

function getSubjectByLocale(locale: string, name: string): string {
  // Map en-GB to use "en" subject (since they're both English)
  const normalizedLocale = locale === "en-GB" ? "en" : locale;

  const subjectMap: Record<string, string> = {
    en: `Contact Form - ${name}`,
    "zh-TW": `聯絡表單 - ${name}`,
    "zh-CN": `联系表单 - ${name}`,
    ja: `お問い合わせフォーム - ${name}`,
    de: `Kontaktformular - ${name}`,
    "en-DK": `Contact Form - ${name}`,
    hi: `संपर्क फॉर्म - ${name}`,
    ko: `문의 양식 - ${name}`,
    pl: `Formular kontaktowy - ${name}`,
  };

  return subjectMap[normalizedLocale] || `Contact Form - ${name}`;
}

function getLanguageDisplay(locale: string): string {
  const languageMap: Record<string, string> = {
    en: "English",
    "en-GB": "English (UK)",
    "zh-TW": "繁體中文",
    "zh-CN": "简体中文",
    ja: "日本語",
    de: "Deutsch",
    "en-DK": "English (DK)",
    hi: "हिन्दी",
    ko: "한국어",
    pl: "Polski",
  };

  return languageMap[locale] || "English";
}

function getLocaleRegion(locale: string): string {
  const regionMap: Record<string, string> = {
    en: "US",
    "en-GB": "UK",
    "zh-TW": "Taiwan",
    "zh-CN": "China",
    ja: "Japan",
    de: "Germany",
    "en-DK": "Denmark",
    hi: "India",
    ko: "South Korea",
    pl: "Poland",
  };

  return regionMap[locale] || "";
}

function getCustomerAutoReply(locale: string, name: string, model?: string) {
  const safeName = name || "Customer";
  const safeModel = model || "-";

  const contentMap: Record<
    string,
    { subject: string; html: string }
  > = {
    en: {
      subject: `We received your Wayne Kerr enquiry`,
      html: `
        <p>Dear ${safeName},</p>
        <p>Thank you for contacting the Wayne Kerr Official Refurbished Store.</p>
        <p>We have received your enquiry and will review your request shortly.</p>
        <p><strong>Model:</strong> ${safeModel}</p>
        <p>If needed, our team may follow up with pricing, availability, and technical details.</p>
        <p>Best regards,<br />Wayne Kerr Official Refurbished Store</p>
      `,
    },
    "zh-TW": {
      subject: `已收到您的 Wayne Kerr 詢問`,
      html: `
        <p>${safeName} 您好，</p>
        <p>感謝您聯絡 Wayne Kerr Official Refurbished Store。</p>
        <p>我們已收到您的詢問，將盡快為您確認內容。</p>
        <p><strong>型號：</strong>${safeModel}</p>
        <p>如有需要，我們將再提供價格、庫存與技術相關資訊。</p>
        <p>敬祝 順心<br />Wayne Kerr Official Refurbished Store</p>
      `,
    },
    "zh-CN": {
      subject: `我们已收到您的 Wayne Kerr 咨询`,
      html: `
        <p>${safeName} 您好，</p>
        <p>感谢您联系 Wayne Kerr Official Refurbished Store。</p>
        <p>我们已经收到您的咨询，并会尽快确认相关内容。</p>
        <p><strong>型号：</strong>${safeModel}</p>
        <p>如有需要，我们将进一步提供价格、库存与技术信息。</p>
        <p>此致<br />Wayne Kerr Official Refurbished Store</p>
      `,
    },
    ja: {
      subject: `Wayne Kerr へのお問い合わせを受け付けました`,
      html: `
        <p>${safeName} 様</p>
        <p>Wayne Kerr Official Refurbished Store へお問い合わせいただきありがとうございます。</p>
        <p>お問い合わせ内容を受領しました。内容を確認のうえ、追ってご連絡いたします。</p>
        <p><strong>型番:</strong> ${safeModel}</p>
        <p>必要に応じて、価格・在庫・技術情報をご案内いたします。</p>
        <p>よろしくお願いいたします。<br />Wayne Kerr Official Refurbished Store</p>
      `,
    },
  };

  return contentMap[locale] || contentMap.en;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resend = getResendClient();

    const spamCheck = isSpam(body);
    if (spamCheck.spam) {
      console.warn("[contact] spam blocked:", spamCheck.reason, {
        name: body.name,
        email: body.email,
        country: body.country,
      });

      try {
        if (resend) {
          await resend.emails.send({
            from: getSenderEmail(),
            to: [getNotificationEmail()],
            subject: `[BLOCKED] Contact form (${spamCheck.reason})`,
            html: `
              <h2>Blocked submission</h2>
              <p><strong>Reason:</strong> ${spamCheck.reason}</p>
              <p><strong>Locale:</strong> ${body.locale || ""}</p>
              <p><strong>Name:</strong> ${body.name || ""}</p>
              <p><strong>Email:</strong> ${body.email || ""}</p>
              <p><strong>Phone:</strong> ${body.phone || ""}</p>
              <p><strong>Company:</strong> ${body.company || ""}</p>
              <p><strong>Country:</strong> ${body.country || ""}</p>
              <p><strong>Topic:</strong> ${body.topic || ""}</p>
              <p><strong>Model:</strong> ${body.model || ""}</p>
              <p><strong>Message:</strong> ${body.message || ""}</p>
            `,
          });
        }
      } catch (e) {
        console.error("[contact] failed to send spam-review notification:", e);
      }

      return NextResponse.json({ data: { id: "ok" } });
    }

    const locale = body.locale || "en";

    const subject = getSubjectByLocale(locale, body.name);
    const languageDisplay = getLanguageDisplay(locale);
    const localeRegion = getLocaleRegion(locale);

    if (!resend) {
      return NextResponse.json(
        { error: "Contact email service is not configured." },
        { status: 503 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: getSenderEmail(),
      to: [getNotificationEmail()],
      subject: subject,
      html: `
        <h2>New Contact</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Country:</strong> ${body.country}</p>
        <p><strong>Topic:</strong> ${body.topic}</p>
        <p><strong>Model:</strong> ${body.model}</p>
        <p><strong>Message:</strong> ${body.message}</p>
        <p><strong>Language:</strong> ${languageDisplay}</p>
        ${localeRegion ? `<p><strong>Region:</strong> ${localeRegion}</p>` : ""}
      `,
    });

    if (error) {
      console.error("[contact] resend send failed", {
        error,
        from: getSenderEmail(),
        to: getNotificationEmail(),
        locale,
        subject,
      });

      return NextResponse.json(
        {
          error:
            typeof error === "object" && error && "message" in error
              ? error.message
              : "Failed to send contact email.",
        },
        { status: 500 },
      );
    }

    const autoReply = getCustomerAutoReply(locale, body.name, body.model);
    const customerEmail = typeof body.email === "string" ? body.email.trim() : "";

    if (customerEmail) {
      const { error: autoReplyError } = await resend.emails.send({
        from: getSenderEmail(),
        to: [customerEmail],
        subject: autoReply.subject,
        html: autoReply.html,
      });

      if (autoReplyError) {
        console.error("[contact] customer auto-reply failed", {
          error: autoReplyError,
          to: customerEmail,
          locale,
        });
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("[contact] unexpected error", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      },
      { status: 500 },
    );
  }
}
