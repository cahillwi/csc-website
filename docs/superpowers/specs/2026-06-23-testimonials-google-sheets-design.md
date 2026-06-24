# Testimonials from Google Sheets

## Summary

Replace the hardcoded testimonials on the homepage with data fetched from a Google Sheet in Drive. Dan curates reviews by marking rows as "Published" and the site picks up changes within 60 seconds (ISR, same pattern as the gallery).

## Google Sheet Template

Spreadsheet with a single sheet named `Reviews` and these columns:

| Column | Type | Notes |
|--------|------|-------|
| Name | Text | Display name (e.g., "Sarah M.") |
| Location | Text | Town/state (e.g., "West Hartford, CT") |
| Quote | Text | The testimonial text |
| Rating | Number (1-5) | Star rating to display |
| Date | Date (YYYY-MM-DD) | Used for sorting — most recent first |
| Published | YES/NO | Only "YES" rows appear on the site |

Seed data (the 3 existing hardcoded reviews):

| Name | Location | Quote | Rating | Date | Published |
|------|----------|-------|--------|------|-----------|
| Sarah M. | West Hartford, CT | Creative Space finished our basement and it instantly became our favorite room in the house. Clean, on time, and the price was exactly what they quoted. | 5 | 2025-01-15 | YES |
| Mike & Janet R. | Glastonbury, CT | They showed up when they said they would and treated our home like it was their own. No runaround, no surprise charges. Just solid work. | 5 | 2025-02-20 | YES |
| The Coleman Family | Manchester, CT | Re-did our kitchen start to finish. They handled everything and kept us in the loop the whole way. Could not recommend them more. | 5 | 2025-03-10 | YES |

## Architecture

### New file: `src/lib/google-sheets.ts`

- Uses `googleapis` Sheets API (already installed) with the existing `GOOGLE_API_KEY`
- Reads all rows from the `Reviews` sheet
- Filters to Published = YES
- Sorts by Date descending
- Returns the top 3

### Modified file: `src/app/page.tsx`

- Add `export const revalidate = 60` (ISR, matches gallery)
- Convert to async server component
- Fetch testimonials from `google-sheets.ts`
- Remove hardcoded `reviews` array
- Render the same card layout with fetched data
- Graceful fallback: if fetch fails, show nothing (no crash)

### Environment

- New env var: `GOOGLE_SHEETS_TESTIMONIALS_ID` — the spreadsheet ID from the Google Sheets URL

### No new dependencies

`googleapis` already includes the Sheets API client.

## Data Flow

```
Google Sheet (Dan edits)
  → Sheets API (read-only, API key auth)
  → src/lib/google-sheets.ts (fetch + filter + sort)
  → Homepage server component (renders top 3)
  → ISR cache (60s TTL, same as gallery)
```

## Spreadsheet Setup

1. Create a Google Sheet with the columns above
2. Add the 3 seed reviews
3. Share the sheet as "Anyone with the link can view"
4. Copy the spreadsheet ID from the URL
5. Set `GOOGLE_SHEETS_TESTIMONIALS_ID` in the environment

## Edge Cases

- Sheet is empty or no published rows → testimonials section renders nothing
- Sheets API is down → ISR serves stale cached version; if no cache exists, section renders nothing
- Missing/malformed rows → skip invalid rows silently
