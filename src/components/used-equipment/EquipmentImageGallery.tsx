"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

type EquipmentImageGalleryProps = {
  images: string[];
  model: string;
  warrantyBadge: string;
  caption: string;
};

export default function EquipmentImageGallery({
  images,
  model,
  warrantyBadge,
  caption,
}: EquipmentImageGalleryProps) {
  const galleryImages = useMemo(() => images.filter(Boolean), [images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasMultipleImages = galleryImages.length > 1;
  const currentImage = galleryImages[selectedIndex] ?? galleryImages[0];

  function showPreviousImage() {
    if (!hasMultipleImages) return;

    setSelectedIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  }

  function showNextImage() {
    if (!hasMultipleImages) return;

    setSelectedIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  }

  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, galleryImages.length]);

  if (!currentImage) {
    return null;
  }

  return (
    <>
      <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`overflow-hidden rounded-2xl border-2 bg-white p-2 shadow-sm transition-transform hover:scale-[1.01] dark:bg-white/10 ${
              selectedIndex === index
                ? "border-blue-600"
                : "border-gray-200 dark:border-white/10"
            }`}
            aria-label={`Show image ${index + 1} of ${galleryImages.length} for ${model}`}
          >
            <img
              src={image}
              alt={`${model} thumbnail ${index + 1}`}
              className="h-20 w-20 object-contain"
            />
          </button>
        ))}
      </div>

      <div className="order-1 lg:order-2">
        <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(232,241,252,1)_0%,rgba(216,231,248,1)_100%)] p-6 dark:bg-[linear-gradient(180deg,rgba(30,41,59,0.92)_0%,rgba(15,23,42,1)_100%)]">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(226,238,252,1)_0%,rgba(212,228,247,1)_100%)] p-6 dark:bg-[linear-gradient(180deg,rgba(51,65,85,0.55)_0%,rgba(30,41,59,0.65)_100%)]">
            <div className="absolute left-5 top-5 z-10 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-700 shadow-lg ring-1 ring-black/5">
              {warrantyBadge}
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="group relative block w-full"
              aria-label={`Open ${model} image in larger view`}
            >
              <img
                src={currentImage}
                alt={`${model} image ${selectedIndex + 1}`}
                className="mx-auto block aspect-[4/3] w-full object-contain"
              />
              <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-semibold text-gray-700 opacity-0 shadow-lg ring-1 ring-black/5 transition-opacity group-hover:opacity-100">
                <ZoomIn size={14} />
                Enlarge
              </span>
            </button>

            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-5 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg ring-1 ring-black/5 transition hover:bg-white"
                  aria-label={`Show previous ${model} image`}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-5 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg ring-1 ring-black/5 transition hover:bg-white"
                  aria-label={`Show next ${model} image`}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            ) : null}

            <img
              src="/images/badges/used-premium-sticker.png"
              alt="Wayne Kerr Premium Used badge"
              className="absolute bottom-5 right-5 h-16 w-16 rounded-full bg-white/92 p-1 shadow-xl ring-1 ring-black/5 sm:h-20 sm:w-20"
            />
          </div>

          <div className="mt-4 flex items-center justify-start gap-2">
            {hasMultipleImages ? (
              galleryImages.map((image, index) => (
                <button
                  key={`${image}-dot-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    selectedIndex === index ? "bg-blue-600" : "bg-blue-200"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))
            ) : null}
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            {caption}
          </p>
        </div>
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/90 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${model} image viewer`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="mx-auto flex h-full max-w-6xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4 text-white">
              <div className="text-sm font-medium tracking-[0.14em] text-white/80">
                {selectedIndex + 1} / {galleryImages.length}
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Close image viewer"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative flex-1">
              <img
                src={currentImage}
                alt={`${model} enlarged image ${selectedIndex + 1}`}
                className="h-full w-full object-contain"
              />

              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-5"
                    aria-label={`Show previous ${model} image`}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-5"
                    aria-label={`Show next ${model} image`}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
