# Gallery Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users click any photo in a project's "From the job" grid to view it full-size in a lightbox overlay with left/right navigation.

**Architecture:** A standalone `Lightbox` client component rendered by `ProjectModal` when a thumbnail is clicked. No new dependencies — keyboard, touch, and click navigation built with React hooks.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Next/Image

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/components/Lightbox.tsx` | Full-screen photo lightbox with navigation |
| Modify | `src/app/gallery/GalleryClient.tsx` | Wire thumbnails to open lightbox |

---

### Task 1: Create the Lightbox component

**Files:**
- Create: `src/components/Lightbox.tsx`

- [ ] **Step 1: Create `src/components/Lightbox.tsx` with the full component**

```tsx
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
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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

  return (
    <div
      className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-sm flex flex-col animate-csc-fade"
      onClick={onClose}
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to `Lightbox.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/components/Lightbox.tsx
git commit -m "feat(gallery): add Lightbox component (GH-13)"
```

---

### Task 2: Wire thumbnails to open the Lightbox

**Files:**
- Modify: `src/app/gallery/GalleryClient.tsx`

- [ ] **Step 1: Add the `useState` import for lightbox index and the Lightbox import**

At the top of `GalleryClient.tsx`, the existing import already includes `useState`. Add the Lightbox import after the existing imports:

```tsx
import Lightbox from "@/components/Lightbox";
```

- [ ] **Step 2: Add `lightboxIndex` state to `ProjectModal`**

Inside the `ProjectModal` function (line 195), add state after the `hasPhotos` const:

```tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
```

- [ ] **Step 3: Make thumbnails clickable**

Replace the existing gallery map block (lines 298-311) — the `{p.gallery.map((g) => (` section — with clickable thumbnails:

```tsx
{p.gallery.map((g, i) => (
  <button
    key={g}
    onClick={() => setLightboxIndex(i)}
    className="aspect-square rounded-[10px] overflow-hidden border border-border-card cursor-pointer transition-transform hover:scale-105"
  >
    <Image
      src={g}
      alt={`${p.title} photo ${i + 1}`}
      width={200}
      height={200}
      className="w-full h-full object-cover"
    />
  </button>
))}
```

- [ ] **Step 4: Render the Lightbox conditionally**

After the closing `<Link>` tag (the "Start a project like this" CTA, around line 318) and before the final closing `</div>` of the modal content area, add:

```tsx
{lightboxIndex !== null && p.gallery && (
  <Lightbox
    images={p.gallery}
    startIndex={lightboxIndex}
    title={p.title}
    location={p.location}
    onClose={() => setLightboxIndex(null)}
  />
)}
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/app/gallery/GalleryClient.tsx
git commit -m "feat(gallery): wire thumbnails to open lightbox (GH-13)"
```

---

### Task 3: Build and manual test

- [ ] **Step 1: Run the production build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `npm run lint 2>&1 | tail -10`
Expected: No lint errors

- [ ] **Step 3: Manual test in browser**

Start dev server: `npm run dev`

Test checklist:
1. Navigate to `/gallery`
2. Click the "Wet cellar to dry, finished space" project card
3. Scroll to "From the job" section — thumbnails should show hover scale effect and pointer cursor
4. Click any thumbnail — lightbox should open with that photo full-size
5. Verify top bar shows "Wet cellar to dry, finished space — Connecticut"
6. Verify bottom bar shows correct counter (e.g. "1 of 6")
7. Click right arrow — photo advances, counter updates
8. Click left arrow — photo goes back
9. Press keyboard ArrowRight/ArrowLeft — navigation works
10. Press Escape — lightbox closes, modal still visible
11. Click ✕ button — lightbox closes
12. Click dark backdrop area — lightbox closes
13. Navigate to last photo, press right — wraps to first
14. Navigate to first photo, press left — wraps to last
15. On mobile viewport (use devtools responsive mode): swipe left/right on the photo to navigate

- [ ] **Step 4: Commit any fixes if needed, then final commit**

```bash
git add -A
git commit -m "chore(gallery): verify lightbox build and lint (GH-13)"
```
