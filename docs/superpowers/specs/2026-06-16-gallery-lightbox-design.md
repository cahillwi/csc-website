# Gallery Lightbox Design

**Issue:** GH-13
**Branch:** `feature/GH-13-gallery-lightbox`
**Date:** 2026-06-16

## Summary

Add a lightbox overlay to the gallery page so users can click any photo in a project's "From the job" grid to view it full-size, then navigate left/right through the set.

## Scope

- One new component: `src/components/Lightbox.tsx`
- One modified file: `src/app/gallery/GalleryClient.tsx`
- No new dependencies, data model changes, or routing changes

## Lightbox Component

**File:** `src/components/Lightbox.tsx` (client component)

### Props

| Prop | Type | Description |
|------|------|-------------|
| `images` | `string[]` | Gallery image URLs |
| `startIndex` | `number` | Index of the photo that was clicked (0-based) |
| `title` | `string` | Project title |
| `location` | `string` | Project location |
| `onClose` | `() => void` | Callback to close the lightbox |

### State

- `currentIndex: number` — which photo is currently displayed, initialized from `startIndex`

### Layout

Top-to-bottom, full-screen overlay:

1. **Top bar** — Project title + location on the left, close button (✕) on the right
2. **Photo area** — Image centered in remaining space using `object-contain` to fit viewport without cropping. Left/right arrow buttons overlaid on the sides.
3. **Bottom bar** — Counter text centered (e.g. "3 of 12")

### Styling

- Overlay: `fixed inset-0 z-[130]` with dark backdrop (`bg-black/90`) and `backdrop-blur-sm`
- Sits above `ProjectModal` which uses `z-[120]`
- Arrow buttons: semi-transparent circular buttons on left/right edges, vertically centered
- Top/bottom bars: semi-transparent dark background strips
- Title text in site cream color (`#FAF6EF`), counter in muted cream
- Fade-in animation consistent with existing `animate-csc-fade`

### Navigation

Three input methods:

1. **On-screen arrows** — Circular buttons (`‹` / `›`) overlaid on left/right edges of the photo area
2. **Keyboard** — `ArrowLeft` / `ArrowRight` to navigate, `Escape` to close. Implemented via `useEffect` keydown listener.
3. **Mobile swipe** — `onTouchStart` / `onTouchEnd` handlers detecting horizontal swipe > 50px threshold

### Edge Behavior

Navigation wraps around: last photo → first, first photo → last.

### Close Triggers

- ✕ button in top bar
- `Escape` key
- Click on the backdrop (outside the photo)

## GalleryClient Integration

### Changes to `ProjectModal`

1. Add state: `lightboxIndex: number | null` (null = lightbox closed)
2. Make each thumbnail in the "From the job" grid clickable with `onClick={() => setLightboxIndex(i)}`
3. Add `cursor-pointer` and hover scale effect to thumbnails
4. Conditionally render `<Lightbox>` when `lightboxIndex !== null`, passing:
   - `images={project.gallery}`
   - `startIndex={lightboxIndex}`
   - `title={project.title}`
   - `location={project.location}`
   - `onClose={() => setLightboxIndex(null)}`

### Body Scroll

Body scroll is already locked by `ProjectModal`. No additional scroll locking needed for the lightbox layer.

## Accessibility

- Focus trapped within lightbox while open
- Escape key closes lightbox
- Arrow buttons have `aria-label` attributes
- Image has `alt` text derived from project title + index

## Out of Scope

- Thumbnail strip / filmstrip below the main image
- Zoom / pinch-to-zoom
- Image preloading or lazy loading optimizations
- Before/after images in the lightbox (they are already in the gallery array)
