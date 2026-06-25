import { getRequestConfig } from "next-intl/server";
import { defaultLocale, localeNames, locales, type Locale } from "./locales";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  const [common, contact] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/contact.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...contact.default,
    },
  };
});

export { defaultLocale, localeNames, locales };
export type { Locale };
