import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { defaultLocale, locales, type Locale } from "./i18n/locales";

const handleI18nRouting = createMiddleware(routing);
const localeCookieName = "NEXT_LOCALE";

function isSupportedLocale(value?: string | null): value is Locale {
  return !!value && locales.includes(value as Locale);
}

function hasLocalePrefix(pathname: string) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const preferredLanguages = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const language of preferredLanguages) {
    if (
      language.startsWith("zh-tw") ||
      language.startsWith("zh-hk") ||
      language.startsWith("zh-mo") ||
      language.startsWith("zh-hant")
    ) {
      return "zh-TW";
    }

    if (
      language.startsWith("zh-cn") ||
      language.startsWith("zh-sg") ||
      language.startsWith("zh-hans")
    ) {
      return "zh-CN";
    }

    if (language.startsWith("en-gb")) return "en-GB";
    if (language === "ja" || language.startsWith("ja-")) return "ja";
    if (language === "de" || language.startsWith("de-")) return "de";
    if (language === "ko" || language.startsWith("ko-")) return "ko";
    if (language === "pl" || language.startsWith("pl-")) return "pl";
    if (language === "hi" || language.startsWith("hi-")) return "hi";
    if (language === "en" || language.startsWith("en-")) return "en";
  }

  return null;
}

function localeFromCountry(country: string | null): Locale {
  switch ((country || "").toUpperCase()) {
    case "TW":
    case "HK":
    case "MO":
      return "zh-TW";
    case "CN":
      return "zh-CN";
    case "JP":
      return "ja";
    case "DE":
    case "AT":
    case "CH":
      return "de";
    case "KR":
      return "ko";
    case "PL":
      return "pl";
    case "IN":
      return "hi";
    case "DK":
      return "en-DK";
    case "GB":
      return "en-GB";
    default:
      return defaultLocale;
  }
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerLocale = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  if (headerLocale) {
    return headerLocale;
  }

  return localeFromCountry(request.headers.get("x-vercel-ip-country"));
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!hasLocalePrefix(pathname)) {
    const preferredLocale = getPreferredLocale(request);

    if (preferredLocale !== defaultLocale) {
      const redirectUrl = new URL(
        `/${preferredLocale}${pathname}${search}`,
        request.url,
      );
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.set(localeCookieName, preferredLocale, {
        path: "/",
        sameSite: "lax",
      });

      return response;
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for:
  // - api routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - files with extensions (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
