import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getUsedEquipmentInventory } from "@/data/usedEquipment";
import { BORDER_STYLES, TEXT_SECONDARY } from "@/src/styles/styles";

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

export default async function UsedEquipmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("usedEquipment");
  const nav = await getTranslations("navigation");
  const footer = await getTranslations("footer");
  const usedEquipmentInventory = getUsedEquipmentInventory(locale);
  const trustPoints = t.raw("hero.trustPoints") as string[];
  const prefillCopy = {
    intro: t("contactPrefill.intro"),
    model: t("contactPrefill.model"),
    stockRef: t("contactPrefill.stockRef"),
    request: t("contactPrefill.request"),
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      <section className="border-b border-gray-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 text-sm font-medium text-gray-400">
              {nav("about")}
            </div>
            <p className="text-3xl font-semibold leading-tight text-gray-300 sm:text-4xl">
              Wayne Kerr&apos;s Refurbished Equipment Story
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className={`mt-6 max-w-2xl text-lg leading-8 ${TEXT_SECONDARY}`}>
              {t("hero.subtitle")} {footer("tagline")}.
            </p>
            <p className={`mt-5 max-w-2xl text-lg leading-8 ${TEXT_SECONDARY}`}>
              Each listing is prepared for customer-facing delivery with a like-new presentation, OEM support, and one-unit-per-listing availability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#inventory"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {t("hero.viewInventory")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                {nav("about")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-[1.35fr_0.85fr] gap-5">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="/images/products/instruments/6500B_system.webp"
                alt="Wayne Kerr refurbished equipment facility"
                className="h-full min-h-[480px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <img
                src="/images/products/instruments/3260B_system.webp"
                alt="Wayne Kerr refurbished preparation"
                className="h-[230px] w-full rounded-[2rem] object-cover"
              />
              <div className={`rounded-[2rem] border ${BORDER_STYLES} bg-white p-6 shadow-sm`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  {t("hero.builtFor")}
                </p>
                <div className="mt-5 space-y-4">
                  {trustPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex rounded-full bg-blue-600 p-1 text-white">
                        <BadgeCheck size={14} />
                      </span>
                      <p className={`leading-7 ${TEXT_SECONDARY}`}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8"
      >
        <div>
          <p className="text-sm font-medium text-gray-400">{nav("about")}</p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-gray-950 sm:text-5xl">
            {t("hero.certifiedTitle")}
          </h2>
          <p className={`mt-6 max-w-xl text-lg leading-8 ${TEXT_SECONDARY}`}>
            {t("hero.certifiedDescription")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-gray-200/80">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              OEM standard
            </p>
            <p className="mt-4 text-2xl font-semibold leading-tight text-gray-950">
              Recalibrated, cleaned, and prepared for direct customer presentation.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-gray-200/80">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Single-unit inventory
            </p>
            <p className="mt-4 text-2xl font-semibold leading-tight text-gray-950">
              Each listing is one specific refurbished unit, and once sold it is removed.
            </p>
          </div>
        </div>
      </section>

      <section
        id="inventory"
        className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8"
      >
        <div className="mb-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.24em] text-blue-700 sm:text-xl">
              {t("inventory.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              {t("inventory.description")}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-600 sm:text-base">
            {t("inventory.count", { count: usedEquipmentInventory.length })}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {usedEquipmentInventory.map((item) => (
            <article
              key={item.slug}
              className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#88a9c7_0%,#8cb3d5_28%,#0f3d78_72%,#021c36_100%)] px-8">
                <img
                  src={item.image}
                  alt={item.model}
                  className="relative z-10 max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 z-20 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700 shadow-lg ring-1 ring-black/5 sm:px-4 sm:text-xs">
                  {t("inventory.warrantyBadge")}
                </div>
                <img
                  src="/images/badges/used-premium-sticker.png"
                  alt="Wayne Kerr Premium Used badge"
                  className="absolute bottom-4 right-4 z-20 h-14 w-14 rounded-full bg-white/85 p-1 shadow-xl ring-1 ring-black/5 sm:h-16 sm:w-16"
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_34%)]"
                  aria-hidden="true"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-600">
                  {item.family}
                </p>
                <h3 className="mt-3 text-[2rem] font-semibold leading-tight text-gray-950">
                  {item.model}
                </h3>
                <p className="mt-2 text-xl font-semibold leading-tight text-gray-950">
                  {item.title}
                </p>

                <p className={`mt-4 min-h-[84px] text-base leading-8 ${TEXT_SECONDARY}`}>
                  {item.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.groupTags.slice(0, 1).map((tag) => (
                    <span
                      key={`${item.slug}-${tag}`}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {item.frequencyRange}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                      {t("inventory.price")}
                    </p>
                    <p className="text-lg font-semibold text-gray-950">
                      {item.currency} {item.price}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
                  {t("inventory.stockRef")}: {item.stockReference}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                  {t("inventory.singleUnitAvailability")}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/${locale}/equipment/${item.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    {t("inventory.details")}
                  </Link>
                  <Link
                    href={buildUsedEquipmentContactHref(locale, item.model, item.stockReference, prefillCopy)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    {t("inventory.contactUs")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
