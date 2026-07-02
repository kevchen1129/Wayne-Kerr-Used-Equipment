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
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
