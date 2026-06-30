"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { localeNames, locales, type Locale } from "@/i18n/locales";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = (params.locale as Locale) || "en";

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments.splice(1, 1);
    }
    router.push(`/${newLocale}${segments.join("/")}`);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLanguage(e.target.value as Locale)}
      aria-label="Select language"
      className="h-10 w-full min-w-0 rounded-xl border border-gray-300 bg-transparent px-3 text-[15px] font-medium text-gray-700 outline-none sm:h-auto sm:w-auto sm:rounded-full sm:border-0 sm:px-2 sm:text-sm"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeNames[locale]}
        </option>
      ))}
    </select>
  );
}
