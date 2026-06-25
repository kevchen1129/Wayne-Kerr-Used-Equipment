"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Globe2, Search, User } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";

export default function StoreHeader() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations();

  return (
    <header className="sticky inset-x-0 top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-4">
              <img
                src="/images/logo/logo.webp"
                alt="Wayne Kerr"
                className="h-8 w-auto"
              />
              <div className="border-l border-gray-200 pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Wayne Kerr
                </p>
                <p className="text-base font-semibold text-gray-950">
                  Official Refurbished Store
                </p>
              </div>
            </Link>

            <div className="flex flex-1 items-center gap-3 lg:max-w-2xl lg:px-8">
              <div className="flex flex-1 items-center rounded-2xl border border-gray-300 bg-white px-4 py-3 shadow-sm">
                <Search size={18} className="mr-3 text-gray-400" />
                <input
                  type="text"
                  value={t("usedEquipment.inventory.title")}
                  readOnly
                  aria-label="Search used equipment"
                  className="w-full bg-transparent text-base text-gray-500 outline-none"
                />
              </div>
              <button
                type="button"
                className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-2xl bg-blue-600 text-white transition-colors hover:bg-blue-700"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 self-end lg:self-auto">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
                aria-label="Account"
              >
                <User size={18} />
              </button>
              <div className="hidden sm:flex sm:items-center sm:gap-2 rounded-full border border-gray-300 px-3 py-2">
                <Globe2 size={16} className="text-gray-500" />
                <LocaleSwitcher />
              </div>
              <div className="sm:hidden">
                <LocaleSwitcher />
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-base font-medium text-gray-700">
            <Link href={`/${locale}`} className="transition-colors hover:text-blue-700">
              {t("navigation.home")}
            </Link>
            <Link href={`/${locale}/#inventory`} className="transition-colors hover:text-blue-700">
              {t("usedEquipment.inventory.title")}
            </Link>
            <Link href={`/${locale}/#about`} className="transition-colors hover:text-blue-700">
              {t("navigation.about")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
