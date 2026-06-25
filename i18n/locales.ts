export const locales = ["en", "en-GB", "en-DK", "zh-TW", "zh-CN", "ja", "de", "hi", "ko", "pl"] as const;

export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "en-GB": "English (UK)",
  "en-DK": "English (DK)",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  ja: "日本語",
  de: "Deutsch",
  hi: "हिन्दी",
  ko: "한국어",
  pl: "Polski",
};
