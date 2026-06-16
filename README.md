# Creative Space Construction — Website

Website for Creative Space Construction, an owner-operated remodeling and repair company serving Connecticut.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Running locally

1. Make sure you have Node.js 18+ installed
2. Clone this repo and install dependencies:

```bash
git clone <your-repo-url>
cd csc_website
npm install
```

3. Create a `.env.local` file with the HubSpot credentials (see `.env.example`):

```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=246512368
NEXT_PUBLIC_HUBSPOT_FORM_GUID=95a6de76-1a56-4b34-bb47-82f729a205d0
```

4. Start the dev server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js — no build settings needed
5. Add the environment variables in Vercel's project settings:
   - `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` = `246512368`
   - `NEXT_PUBLIC_HUBSPOT_FORM_GUID` = `95a6de76-1a56-4b34-bb47-82f729a205d0`
6. Click Deploy — that's it. Every push to `main` will auto-deploy.

## Adding gallery photos

Photos live in `public/gallery/` organized by category folder:

```
public/gallery/
  basements/      ← basement & waterproofing photos
  kitchens/       ← kitchen remodel photos
  bathrooms/      ← bathroom remodel photos
  decks/          ← deck & patio photos
  interiors/      ← interior renovation photos
```

To add new photos:

1. Drop your image files into the right category folder
2. Update the gallery config file (will be at `src/data/gallery.ts` once the Gallery page is built) with the filename and a short description
3. Commit and push — the photos will appear on the site after deploy

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

## Project structure

```
src/
  app/
    page.tsx          ← Home page
    layout.tsx        ← Shared layout (loads fonts, wraps header/footer)
    services/page.tsx ← Services page
    gallery/page.tsx  ← Gallery page
    about/page.tsx    ← About page
    contact/page.tsx  ← Contact page (HubSpot form)
    globals.css       ← Design tokens & global styles
  components/
    Header.tsx        ← Sticky header with nav + mobile menu
    Footer.tsx        ← Full footer with contact info & hours
public/
  images/             ← Brand assets (logo, headshot)
  gallery/            ← Project photos by category
```

## HubSpot integration

The Contact page form submits leads to HubSpot CRM via the Forms v3 API. The Portal ID and Form GUID are stored in environment variables (`.env.local` locally, Vercel env vars in production). The form maps to these HubSpot properties:

| Form field               | HubSpot property           |
| ------------------------ | -------------------------- |
| First name               | `firstname`                |
| Last name                | `lastname`                 |
| Email                    | `email`                    |
| Phone                    | `phone`                    |
| Project type             | `project_type`             |
| Preferred contact method | `preferred_contact_method` |
| Project details          | `project_details`          |

## Design system

- **Fonts:** Barlow Condensed (headings), Barlow (body) — loaded via `next/font/google`
- **Colors:** Cream `#FAF6EF`, dark `#16130F`, orange `#E87722`, white `#FFFFFF`
- **Max width:** 1200px
- **Mobile breakpoint:** 1024px (nav collapses to hamburger)
