import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  FileText,
  MapPin,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { locales } from "@/i18n/locales";
import { getUsedEquipmentBySlug, usedEquipmentInventory } from "@/data/usedEquipment";
import { BORDER_STYLES, TEXT_SECONDARY } from "@/src/styles/styles";
import { formatDisplayPrice } from "@/utils/formatPrice";

function buildUsedEquipmentContactHref(
  locale: string,
  model: string,
  stockReference: string,
  copy: {
    intro: string;
    model: string;
    stockRef: string;
    request: string;
  },
) {
  const params = new URLSearchParams({
    topic: "pricing",
    model,
    message: `${copy.intro}\n${copy.model}: ${model}\n${copy.stockRef}: ${stockReference}\n${copy.request}`,
  });

  return `/${locale}/contact?${params.toString()}`;
}

export default async function UsedEquipmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getUsedEquipmentBySlug(locale)[slug];
  const t = await getTranslations("usedEquipment");

  if (!item) {
    notFound();
  }

  const prefillCopy = {
    intro: t("contactPrefill.intro"),
    model: t("contactPrefill.model"),
    stockRef: t("contactPrefill.stockRef"),
    request: t("contactPrefill.request"),
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(248,250,252,1)_0%,_rgba(255,255,255,1)_100%)] pt-32 pb-20 dark:bg-[linear-gradient(180deg,_rgba(2,6,23,1)_0%,_rgba(3,7,18,1)_100%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300"
        >
          <ArrowLeft size={16} />
          {t("detail.back")}
        </Link>

        <section
          className={`mt-8 overflow-hidden rounded-[2rem] border ${BORDER_STYLES} bg-white px-5 py-5 shadow-sm dark:bg-white/5 sm:px-7 sm:py-7`}
        >
          <div className="grid gap-8 lg:grid-cols-[96px_minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
              <button
                type="button"
                className="overflow-hidden rounded-2xl border-2 border-blue-600 bg-white p-2 shadow-sm transition-transform hover:scale-[1.01] dark:bg-white/10"
              >
                <img
                  src={item.image}
                  alt={`${item.model} thumbnail`}
                  className="h-20 w-20 object-contain"
                />
              </button>
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5">
                <img
                  src="/images/badges/used-premium-sticker.png"
                  alt="Wayne Kerr Premium Used badge"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="hidden rounded-2xl border border-gray-200 bg-slate-50 px-3 py-4 text-center dark:border-white/10 dark:bg-white/5 lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                  1 Year
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  {t("detail.miniWarranty")}
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(232,241,252,1)_0%,rgba(216,231,248,1)_100%)] p-6 dark:bg-[linear-gradient(180deg,rgba(30,41,59,0.92)_0%,rgba(15,23,42,1)_100%)]">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(226,238,252,1)_0%,rgba(212,228,247,1)_100%)] p-6 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.55)_0%,rgba(30,41,59,0.65)_100%)]">
                  <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-700 shadow-lg ring-1 ring-black/5">
                    {t("detail.warrantyBadge")}
                  </div>
                  <img
                    src={item.image}
                    alt={item.model}
                    className="mx-auto block aspect-[4/3] w-full object-contain"
                  />
                  <img
                    src="/images/badges/used-premium-sticker.png"
                    alt="Wayne Kerr Premium Used badge"
                    className="absolute bottom-5 right-5 h-16 w-16 rounded-full bg-white/92 p-1 shadow-xl ring-1 ring-black/5 sm:h-20 sm:w-20"
                  />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t("detail.imageCaption")}
                </p>
              </div>
            </div>

            <div className="order-3 lg:flex lg:flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                    {item.family}
                  </p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950 dark:text-white xl:text-[4rem]">
                    {item.model}
                  </h1>
                  <p className="mt-3 text-2xl text-gray-600 dark:text-gray-300">
                    {item.title}
                  </p>
                </div>
                <p className="hidden pt-1 text-sm text-gray-400 lg:block">
                  Ref: {item.stockReference}
                </p>
              </div>

              <div className="mt-6 flex flex-1 flex-col lg:min-h-[28rem]">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-red-500">
                      {t("detail.oneUnitPerListing")}
                    </p>
                    <p className="text-sm uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                      {t("detail.displayPrice")}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-gray-950 dark:text-white sm:text-4xl">
                      {item.currency} {formatDisplayPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-1 flex-col border-t border-gray-100 pt-5 dark:border-white/10">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                        {t("detail.condition")}
                      </p>
                      <p className={`mt-2 leading-7 ${TEXT_SECONDARY}`}>{item.condition}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                        {t("detail.warranty")}
                      </p>
                      <p className={`mt-2 leading-7 ${TEXT_SECONDARY}`}>{item.warranty}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                        {t("detail.availability")}
                      </p>
                      <p className={`mt-2 leading-7 ${TEXT_SECONDARY}`}>{item.availability}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                        {t("detail.stockRef")}
                      </p>
                      <p className={`mt-2 break-all leading-7 ${TEXT_SECONDARY}`}>
                        {item.stockReference}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-5 dark:border-white/10">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={buildUsedEquipmentContactHref(locale, item.model, item.stockReference, prefillCopy)}
                        className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        {t("detail.requestAvailability")}
                      </Link>
                      {item.datasheet ? (
                        <a
                          href={item.datasheet}
                          target="_blank"
                          rel="noopener noreferrer"
                        className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                      >
                        <FileText size={16} />
                        {t("detail.openDatasheet")}
                      </a>
                      ) : null}
                    </div>

                    {item.stockNote ? (
                      <p className="mt-5 text-sm text-amber-700 dark:text-amber-300">
                        {item.stockNote}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`mt-10 space-y-4`}>
          <details
            className={`group overflow-hidden rounded-[1.5rem] border ${BORDER_STYLES} bg-white shadow-sm open:shadow-md dark:bg-white/5`}
            open
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-xl font-semibold text-gray-950 dark:text-white">
              <span className="flex items-center gap-3">
                <BadgeCheck className="text-blue-600" size={22} />
                {t("detail.keyHighlights")}
              </span>
              <ChevronDown className="transition-transform group-open:rotate-180" size={24} />
            </summary>
            <div className="border-t border-gray-100 px-6 pb-6 pt-4 dark:border-white/10">
              <div className="grid gap-4 md:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-white/5"
                  >
                    <span className="mt-1 inline-flex rounded-full bg-blue-600 p-1 text-white">
                      <BadgeCheck size={14} />
                    </span>
                    <p className={`leading-7 ${TEXT_SECONDARY}`}>{highlight}</p>
                  </div>
                ))}
              </div>
              <p className={`mt-5 text-base leading-8 ${TEXT_SECONDARY}`}>{item.overview}</p>
            </div>
          </details>

          <details
            className={`group overflow-hidden rounded-[1.5rem] border ${BORDER_STYLES} bg-white shadow-sm open:shadow-md dark:bg-white/5`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-xl font-semibold text-gray-950 dark:text-white">
              <span className="flex items-center gap-3">
                <Settings2 className="text-blue-600" size={22} />
                {t("detail.prepared")}
              </span>
              <ChevronDown className="transition-transform group-open:rotate-180" size={24} />
            </summary>
            <div className="border-t border-gray-100 px-6 pb-6 pt-4 dark:border-white/10">
              <div className="grid gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-white/5">
                  <p className={`leading-7 ${TEXT_SECONDARY}`}>{item.shortDescription}</p>
                </div>
                {item.includes.map((entry) => (
                  <div
                    key={entry}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-white/5"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                    <p className={`leading-7 ${TEXT_SECONDARY}`}>{entry}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>

          {item.compatibleWith?.length ? (
            <details
              className={`group overflow-hidden rounded-[1.5rem] border ${BORDER_STYLES} bg-white shadow-sm open:shadow-md dark:bg-white/5`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-xl font-semibold text-gray-950 dark:text-white">
                <span className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-600" size={22} />
                  {t("detail.compatibility")}
                </span>
                <ChevronDown className="transition-transform group-open:rotate-180" size={24} />
              </summary>
              <div className="border-t border-gray-100 px-6 pb-6 pt-4 dark:border-white/10">
                <div className="flex flex-wrap gap-2">
                  {item.compatibleWith.map((target) => (
                    <span
                      key={target}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          ) : null}
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    usedEquipmentInventory.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}
