import {
  projects as hardcodedProjects,
  categoryLabels,
  type MergedGalleryProject,
} from "@/data/gallery";
import { fetchDriveGalleryProjects } from "./google-drive";

export async function getMergedGalleryData(): Promise<MergedGalleryProject[]> {
  let driveProjects;
  try {
    driveProjects = await fetchDriveGalleryProjects();
  } catch (error) {
    console.error("Failed to fetch Drive gallery data:", error);
    return hardcodedProjects.filter((p) => !!p.cover);
  }

  const merged: MergedGalleryProject[] = [];

  for (const project of hardcodedProjects) {
    if (project.cover) {
      merged.push(project);
    }
  }

  for (const dp of driveProjects) {
    merged.push({
      id: `drive-${dp.category}-${dp.folderName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      type: dp.category,
      typeLabel: categoryLabels[dp.category],
      title: dp.title,
      location: dp.location,
      blurb: "",
      did: [],
      cover: dp.images[0].url,
      isDriveGallery: true,
      driveImages: dp.images,
    });
  }

  return merged;
}
