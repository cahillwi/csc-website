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

export type DriveProject = {
  folderName: string;
  title: string;
  location: string;
  category: GalleryCategory;
  images: DriveImage[];
};

export type DriveGalleryData = DriveProject[];

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

function parseFolderName(name: string): { title: string; location: string } {
  const parts = name.split(" - ");
  if (parts.length >= 2) {
    return {
      title: parts.slice(0, -1).join(" - ").trim(),
      location: parts[parts.length - 1].trim(),
    };
  }
  return { title: name.trim(), location: "Connecticut" };
}

async function listSubfolders(
  drive: ReturnType<typeof getDrive>,
  folderId: string
): Promise<{ id: string; name: string }[]> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id,name)",
  });

  return (res.data.files ?? []).filter(
    (f): f is { id: string; name: string } => !!f.id && !!f.name
  );
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
    .filter(
      (f): f is { id: string; name: string; createdTime?: string | null } =>
        !!f.id && !!f.name
    )
    .map((f) => ({
      id: f.id,
      name: f.name,
      url: driveImageUrl(f.id),
      thumbnailUrl: driveThumbnailUrl(f.id),
    }));
}

export async function fetchDriveGalleryProjects(): Promise<DriveGalleryData> {
  const folderId = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;
  if (!folderId) throw new Error("GOOGLE_DRIVE_GALLERY_FOLDER_ID not set");

  const drive = getDrive();

  const categoryFolders = await listSubfolders(drive, folderId);

  const projectsByCategory = await Promise.all(
    categoryFolders.map(async (catFolder) => {
      const category = FOLDER_NAME_MAP[catFolder.name.toLowerCase().trim()];
      if (!category) return [];

      const projectFolders = await listSubfolders(drive, catFolder.id);

      if (projectFolders.length === 0) {
        const images = await listImageFiles(drive, catFolder.id);
        if (images.length === 0) return [];
        return [
          {
            folderName: catFolder.name,
            title: `${catFolder.name} Projects`,
            location: "Connecticut",
            category,
            images,
          },
        ];
      }

      const projects = await Promise.all(
        projectFolders.map(async (projFolder) => {
          const images = await listImageFiles(drive, projFolder.id);
          if (images.length === 0) return null;
          const { title, location } = parseFolderName(projFolder.name);
          return {
            folderName: projFolder.name,
            title,
            location,
            category,
            images,
          };
        })
      );

      return projects.filter((p): p is DriveProject => p !== null);
    })
  );

  return projectsByCategory.flat();
}
