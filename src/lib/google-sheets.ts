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
