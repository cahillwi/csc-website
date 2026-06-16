import {
  projects as hardcodedProjects,
  categoryLabels,
  type GalleryCategory,
  type MergedGalleryProject,
} from "@/data/gallery";
import { fetchDriveGalleryImages } from "./google-drive";

const categoryMeta: Record<
  GalleryCategory,
  { title: string; blurb: string; location: string }
> = {
  basements: {
    title: "Basement Projects",
    blurb: "Recent basement and waterproofing work across Connecticut.",
    location: "Connecticut",
  },
  kitchens: {
    title: "Kitchen Projects",
    blurb: "Recent kitchen remodels across Connecticut.",
    location: "Connecticut",
  },
  bathrooms: {
    title: "Bathroom Projects",
    blurb: "Recent bathroom remodels across Connecticut.",
    location: "Connecticut",
  },
  decks: {
    title: "Deck & Patio Projects",
    blurb: "Recent outdoor builds across Connecticut.",
    location: "Connecticut",
  },
  interiors: {
    title: "Interior Projects",
    blurb: "Recent interior renovations across Connecticut.",
    location: "Connecticut",
  },
};

export async function getMergedGalleryData(): Promise<MergedGalleryProject[]> {
  let driveData;
  try {
    driveData = await fetchDriveGalleryImages();
  } catch (error) {
    console.error("Failed to fetch Drive gallery data:", error);
    return hardcodedProjects;
  }

  const merged: MergedGalleryProject[] = [];
  const categoriesHandled = new Set<GalleryCategory>();

  for (const project of hardcodedProjects) {
    const driveImages = driveData[project.type];

    if (project.cover) {
      // Real project with photos (e.g., basement case study) — keep it, add Drive images
      merged.push({
        ...project,
        driveImages: driveImages ?? undefined,
      });
      categoriesHandled.add(project.type);
    }
    // Skip placeholder projects — they'll be replaced by Drive content below
  }

  // For each category with Drive photos that wasn't handled by a real project,
  // create a Drive-backed gallery project
  for (const [category, images] of Object.entries(driveData) as [
    GalleryCategory,
    typeof driveData[GalleryCategory],
  ][]) {
    if (!images || images.length === 0) continue;
    if (categoriesHandled.has(category)) continue;

    const meta = categoryMeta[category];
    merged.push({
      id: `drive-${category}`,
      type: category,
      typeLabel: categoryLabels[category],
      title: meta.title,
      location: meta.location,
      blurb: meta.blurb,
      did: [],
      cover: images[0].url,
      isDriveGallery: true,
      driveImages: images,
    });
  }

  return merged;
}
