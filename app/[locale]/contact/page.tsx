"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Send, X, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// Hook to detect prefers-reduced-motion
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function ContactFormPageContent() {
  const t = useTranslations("contact");
  const tUsedEquipment = useTranslations("usedEquipment");
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = params.locale as string;
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    topic: "",
    model: "",
    message: "",
    hp_field: "",
  });
  useEffect(() => {
    const model = searchParams.get("model");
    const topic = searchParams.get("topic");
    const message = searchParams.get("message");

    if (model || topic || message) {
      setFormData((prev) => ({
        ...prev,
        model: model || prev.model,
        topic: topic || "pricing",
        message: message || prev.message,
      }));
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (response.ok) {
        setError(null);
        // Show toast notification
        setShowToast(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          topic: "",
          model: "",
          message: "",
          hp_field: "",
        });

        // Auto-hide toast after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        const result = await response.json().catch(() => null);
        setError(result?.error || t("errors.submitFailed"));
      }
    } catch (error) {
      console.error("Error:", error);
      setError(t("errors.generic"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-[900px] mx-auto pt-10 px-10" id="main-content">
          {/* Form Container */}
          <div className="relative">
            <button
              type="button"
              onClick={handleBack}
              aria-label={tUsedEquipment("contact.goBack")}
              className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <X size={20} />
            </button>
            {/* Header */}
            <div
              className="text-center mb-10"
              aria-labelledby="contact-heading"
            >
              <h1
                id="contact-heading"
                className="text-5xl font-bold mb-4 text-primary"
              >
                {t("hero.title")}
              </h1>
            </div>

            {/* Form */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <p className="text-sm text-red-800 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} aria-labelledby="contact-heading">
              <input
                type="text"
                name="hp_field"
                value={formData.hp_field}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.name.label")}{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-required="true"
                    placeholder={t("form.fields.name.placeholder")}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.email.label")}{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-required="true"
                    placeholder={t("form.fields.email.placeholder")}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.phone.label")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder={t("form.fields.phone.placeholder")}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.company.label")}
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    placeholder={t("form.fields.company.placeholder")}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.country.label")}{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    aria-required="true"
                    autoComplete="country"
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  >
                    <option value="">
                      {t("form.fields.country.placeholder")}
                    </option>
                    <option value="US">
                      {t("form.fields.country.options.US")}
                    </option>
                    <option value="UK">
                      {t("form.fields.country.options.UK")}
                    </option>
                    <option value="TW">
                      {t("form.fields.country.options.TW")}
                    </option>
                    <option value="CN">
                      {t("form.fields.country.options.CN")}
                    </option>
                    <option value="DE">
                      {t("form.fields.country.options.DE")}
                    </option>
                    <option value="JP">
                      {t("form.fields.country.options.JP")}
                    </option>
                    <option value="KO">
                      {t("form.fields.country.options.KO")}
                    </option>
                    <option value="SG">
                      {t("form.fields.country.options.SG")}
                    </option>
                    <option value="IN">
                      {t("form.fields.country.options.IN")}
                    </option>
                    <option value="DK">
                      {t("form.fields.country.options.DK")}
                    </option>
                    <option value="PL">
                      {t("form.fields.country.options.PL")}
                    </option>
                    <option value="other">
                      {t("form.fields.country.options.other")}
                    </option>
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.topic.label")}{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    aria-required="true"
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  >
                    <option value="">
                      {t("form.fields.topic.placeholder")}
                    </option>
                    <option value="pricing">
                      {t("form.fields.topic.options.pricing")}
                    </option>
                    <option value="trade-in">
                      {t("form.fields.topic.options.trade-in")}
                    </option>
                    <option value="calibration">
                      {t("form.fields.topic.options.calibration")}
                    </option>
                    <option value="rental">
                      {t("form.fields.topic.options.rental")}
                    </option>
                    <option value="technical">
                      {t("form.fields.topic.options.technical")}
                    </option>
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.model.label")}
                  </label>
                  <input
                    id="model"
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder={t("form.fields.model.placeholder")}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    {t("form.fields.message.label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("form.fields.message.placeholder")}
                    rows={5}
                    className="w-full px-4 py-3.5 border border-border rounded-xl text-primary bg-primary transition-all resize-vertical"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
              >
                {isSubmitting
                  ? t("form.submit.sending")
                  : t("form.submit.default")}
                {!isSubmitting}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`fixed top-6 right-6 z-50 ${prefersReducedMotion ? "" : "animate-slideIn"}`}
        >
          <div className="bg-blue-600 border-l-4 border-blue-400 rounded-xl shadow-xl p-5 pr-12 min-w-[350px] max-w-md">
            <button
              onClick={closeToast}
              type="button"
              aria-label="Close notification"
              className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors rounded"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckCircle
                  className="text-white"
                  size={24}
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">
                  {t("toast.title")}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {t("toast.message")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-slideIn {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export default function ContactFormPage() {
  return (
    <Suspense fallback={null}>
      <ContactFormPageContent />
    </Suspense>
  );
}
