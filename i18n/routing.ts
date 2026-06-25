import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./locales";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,

  // Always show locale prefix in URL
  localePrefix: "as-needed",
});
