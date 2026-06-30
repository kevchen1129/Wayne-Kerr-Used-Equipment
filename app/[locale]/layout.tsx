import type { Metadata } from "next";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import StoreHeader from "@/src/components/layout/StoreHeader";
import StoreFooter from "@/src/components/layout/StoreFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayne Kerr Official Refurbished Store",
  description: "Factory recalibrated and refurbished Wayne Kerr equipment.",
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Suspense fallback={null}>
            <StoreHeader />
          </Suspense>
          {children}
          <StoreFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
