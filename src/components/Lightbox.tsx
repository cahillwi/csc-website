"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  startIndex: number;
  title: string;
  location: string;
  onClose: () => void;
}

export default function Lightbox({
  images,
  startIndex,
  title,
  location,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % (total || 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + (total || 1)) % (total || 1));
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [onClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (!total) return null;

  return (
    <div
      className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-sm flex flex-col animate-csc-fade"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-4 bg-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[#FAF6EF] text-sm font-semibold truncate pr-4">
          {title} — {location}
        </div>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="text-[#FAF6EF] text-2xl leading-none hover:text-orange transition-colors shrink-0 cursor-pointer"
        >
          &times;
        </button>
      </div>

      {/* Photo area */}
      <div
        className="flex-1 relative flex items-center justify-center min-h-0 px-14"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full max-w-[1200px]">
          <Image
            src={images[currentIndex]}
            alt={`${title} — photo ${currentIndex + 1} of ${total}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-[#FAF6EF] text-xl flex items-center justify-center transition-colors cursor-pointer"
        >
          &#8249;
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-[#FAF6EF] text-xl flex items-center justify-center transition-colors cursor-pointer"
        >
          &#8250;
        </button>
      </div>

      {/* Bottom bar */}
      <div
        className="text-center py-4 bg-black/40 text-[#FAF6EF]/60 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {currentIndex + 1} of {total}
      </div>
    </div>
  );
}
