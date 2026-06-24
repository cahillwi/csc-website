# Testimonials from Google Sheets — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded homepage testimonials with data fetched from a Google Sheet, allowing Dan to curate reviews without code changes.

**Architecture:** New `src/lib/google-sheets.ts` module fetches rows from Google Sheets API using the existing `googleapis` package and `GOOGLE_API_KEY`. Homepage becomes an async server component with ISR (60s revalidate). The sheet acts as the single source of truth for testimonials.

**Tech Stack:** Next.js 16 (App Router, ISR), googleapis (Sheets API v4), TypeScript

## Global Constraints

- No new dependencies — `googleapis` already covers Google Sheets API
- Auth uses the existing `GOOGLE_API_KEY` (read-only, API key auth)
- ISR revalidation = 60 seconds (matches gallery pattern)
- Sheet must be shared as "Anyone with the link can view"

---

### Task 1: Create Google Sheets data-fetching module

**Files:**
- Create: `src/lib/google-sheets.ts`

**Interfaces:**
- Consumes: `process.env.GOOGLE_API_KEY`, `process.env.GOOGLE_SHEETS_TESTIMONIALS_ID`
- Produces: `Testimonial` type (`{ name: string; location: string; quote: string; rating: number; date: string }`), `fetchTestimonials(): Promise<Testimonial[]>` (returns top 3 most recent published reviews)

- [ ] **Step 1: Create the module with type and fetch function**

```typescript
// src/lib/google-sheets.ts
import { google } from "googleapis";

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
};

function getSheets() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY not set");
  return google.sheets({ version: "v4", auth: apiKey });
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_TESTIMONIALS_ID;
  if (!spreadsheetId) {
    console.warn("GOOGLE_SHEETS_TESTIMONIALS_ID not set — skipping testimonials");
    return [];
  }

  const sheets = getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Reviews!A2:F",
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return [];

  const testimonials: Testimonial[] = [];

  for (const row of rows) {
    const [name, location, quote, rating, date, published] = row;
    if (!name || !quote || String(published).toUpperCase() !== "YES") continue;

    testimonials.push({
      name: String(name),
      location: String(location || "Connecticut"),
      quote: String(quote),
      rating: Number(rating) || 5,
      date: String(date || ""),
    });
  }

  testimonials.sort((a, b) => b.date.localeCompare(a.date));

  return testimonials.slice(0, 3);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to `src/lib/google-sheets.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/google-sheets.ts
git commit -m "feat(GH-43): add Google Sheets testimonial fetcher"
```

---

### Task 2: Integrate testimonials into the homepage

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `fetchTestimonials()` from `src/lib/google-sheets.ts` returning `Testimonial[]`
- Produces: Homepage renders fetched testimonials (or nothing on failure)

- [ ] **Step 1: Add ISR revalidate export and import**

At the top of `src/app/page.tsx`, add:

```typescript
import Link from "next/link";
import { fetchTestimonials } from "@/lib/google-sheets";

export const revalidate = 60;
```

- [ ] **Step 2: Remove the hardcoded `reviews` array**

Delete lines 111–130 (the `const reviews = [...]` array).

- [ ] **Step 3: Convert HomePage to async and fetch testimonials**

Change the function signature and add a try/catch fetch at the top of the component:

```typescript
export default async function HomePage() {
  let reviews: { quote: string; name: string; town: string }[] = [];
  try {
    const testimonials = await fetchTestimonials();
    reviews = testimonials.map((t) => ({
      quote: t.quote,
      name: t.name,
      town: t.location,
    }));
  } catch {
    // Graceful fallback — render no testimonials
  }
```

- [ ] **Step 4: Conditionally render the testimonials section**

Wrap the `{/* TESTIMONIALS */}` section so it only renders when reviews exist:

```typescript
{reviews.length > 0 && (
  <section className="bg-white border-t border-border-light">
    {/* ... existing testimonial markup unchanged ... */}
  </section>
)}
```

Also update the star rating rendering to use the fetched rating (currently hardcoded as 5 stars). The existing card markup stays identical — it already maps over `reviews` with `.quote`, `.name`, `.town`.

- [ ] **Step 5: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors. The homepage should be listed as a dynamic/ISR route.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(GH-43): fetch homepage testimonials from Google Sheets"
```

---

### Task 3: Add environment variable and verify end-to-end

**Files:**
- Modify: `.env.example` (add the new env var placeholder)

**Interfaces:**
- Consumes: A Google Sheet shared publicly with the correct column structure
- Produces: Working end-to-end integration

- [ ] **Step 1: Add placeholder to `.env.example`**

Append to `.env.example`:

```
GOOGLE_SHEETS_TESTIMONIALS_ID=your_spreadsheet_id_here
```

- [ ] **Step 2: Create the Google Sheet template for Dan**

Create a file `docs/testimonials-template.csv` with seed data that Dan can import:

```csv
Name,Location,Quote,Rating,Date,Published
Sarah M.,West Hartford CT,Creative Space finished our basement and it instantly became our favorite room in the house. Clean on time and the price was exactly what they quoted.,5,2025-01-15,YES
Mike & Janet R.,Glastonbury CT,They showed up when they said they would and treated our home like it was their own. No runaround no surprise charges. Just solid work.,5,2025-02-20,YES
The Coleman Family,Manchester CT,Re-did our kitchen start to finish. They handled everything and kept us in the loop the whole way. Could not recommend them more.,5,2025-03-10,YES
```

- [ ] **Step 3: Run dev server and verify (with env var set)**

Run: `npm run dev`

If `GOOGLE_SHEETS_TESTIMONIALS_ID` is set and points to a valid public sheet, the homepage should display the 3 most recent published testimonials. If not set, the testimonials section should not appear (graceful fallback).

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add .env.example docs/testimonials-template.csv
git commit -m "feat(GH-43): add env var placeholder and sheet template"
```

- [ ] **Step 6: Push branch and create PR**

```bash
git push -u origin feature/GH-43-testimonials-google-sheets
```

Then create a PR targeting `main` with title: "feat: integrate testimonials from Google Sheets (GH-43)"
