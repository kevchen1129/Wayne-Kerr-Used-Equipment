"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { TEXT_SECONDARY } from "@/src/styles/styles";

export default function StoreFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200/70 py-10 dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
            Wayne Kerr Official Refurbished Store
          </p>
          <p className={`mt-3 max-w-2xl ${TEXT_SECONDARY}`}>{t("tagline")}</p>
        </div>

        <div className="space-y-3">
          <div className={`flex items-center gap-3 ${TEXT_SECONDARY}`}>
            <Phone size={16} />
            <span>{t("phone")}</span>
          </div>
          <div className={`flex items-center gap-3 ${TEXT_SECONDARY}`}>
            <Mail size={16} />
            <span>{t("email")}</span>
          </div>
          <div className={`flex items-start gap-3 ${TEXT_SECONDARY}`}>
            <MapPin size={16} className="mt-1 shrink-0" />
            <span>{t("locations")}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`border-t border-gray-200/70 pt-6 text-sm ${TEXT_SECONDARY} dark:border-white/10`}>
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
