import { google } from "googleapis";
import type { GalleryCategory } from "@/data/gallery";

const FOLDER_NAME_MAP: Record<string, GalleryCategory> = {
  basements: "basements",
  kitchens: "kitchens",
  bathrooms: "bathrooms",
  "decks & patios": "decks",
  interiors: "interiors",
};

export type DriveImage = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type DriveGalleryData = Partial<Record<GalleryCategory, DriveImage[]>>;

function getDrive() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY not set");
  return google.drive({ version: "v3", auth: apiKey });
}

function driveImageUrl(fileId: string, width: number = 1200): string {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}

function driveThumbnailUrl(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}=w400`;
}

async function listImageFiles(
  drive: ReturnType<typeof getDrive>,
  folderId: string
): Promise<DriveImage[]> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id,name,createdTime)",
    orderBy: "createdTime desc",
    pageSize: 100,
  });

  return (res.data.files ?? [])
    .filter((f): f is { id: string; name: string; createdTime?: string | null } => !!f.id && !!f.name)
    .map((f) => ({
      id: f.id,
      name: f.name,
      url: driveImageUrl(f.id),
      thumbnailUrl: driveThumbnailUrl(f.id),
    }));
}

export async function fetchDriveGalleryImages(): Promise<DriveGalleryData> {
  const folderId = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;
  if (!folderId) throw new Error("GOOGLE_DRIVE_GALLERY_FOLDER_ID not set");

  const drive = getDrive();

  const foldersRes = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id,name)",
  });

  const folders = (foldersRes.data.files ?? []).filter(
    (f): f is { id: string; name: string } => !!f.id && !!f.name
  );

  const results = await Promise.all(
    folders.map(async (folder) => {
      const category = FOLDER_NAME_MAP[folder.name.toLowerCase().trim()];
      if (!category) return null;
      const images = await listImageFiles(drive, folder.id);
      return { category, images };
    })
  );

  const data: DriveGalleryData = {};
  for (const result of results) {
    if (result && result.images.length > 0) {
      data[result.category] = result.images;
    }
  }

  return data;
}
