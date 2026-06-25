"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type StickySummaryBarProps = {
  image: string;
  model: string;
  price: string;
  currency: string;
  contactHref: string;
  label: string;
  fromLabel: string;
  ctaLabel: string;
};

export default function StickySummaryBar({
  image,
  model,
  price,
  currency,
  contactHref,
  label,
  fromLabel,
  ctaLabel,
}: StickySummaryBarProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = triggerRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-96px 0px 0px 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={triggerRef} className="mt-6 h-px w-full" aria-hidden="true" />

      <div
        className={`fixed inset-x-0 top-24 z-30 transition-all duration-300 ${
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-[1.5rem] border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/90 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5">
                  <img
                    src={image}
                    alt={`${model} summary`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {label}
                  </p>
                  <p className="truncate text-xl font-semibold text-gray-950 dark:text-white">
                    {model}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{fromLabel}</p>
                  <p className="text-2xl font-semibold text-gray-950 dark:text-white">
                    {currency} {price}
                  </p>
                </div>
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
