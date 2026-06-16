export type GalleryCategory =
  | "basements"
  | "kitchens"
  | "bathrooms"
  | "decks"
  | "interiors";

export type GalleryProject = {
  id: string;
  type: GalleryCategory;
  typeLabel: string;
  title: string;
  location: string;
  blurb: string;
  did: string[];
  cover: string;
  beforeImg?: string;
  afterImg?: string;
  gallery?: string[];
};

export type DriveImageRef = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type MergedGalleryProject = GalleryProject & {
  isDriveGallery?: boolean;
  driveImages?: DriveImageRef[];
};

export const categoryLabels: Record<GalleryCategory, string> = {
  basements: "Basements",
  kitchens: "Kitchens",
  bathrooms: "Bathrooms",
  decks: "Decks & Patios",
  interiors: "Interiors",
};

export const projects: GalleryProject[] = [
  {
    id: "basement-1",
    type: "basements",
    typeLabel: "Basement & Waterproofing",
    title: "Wet cellar to dry, finished space",
    location: "Connecticut",
    cover: "/gallery/basements/IMG_1220.PNG",
    beforeImg: "/gallery/basements/IMG_2491.JPEG",
    afterImg: "/gallery/basements/IMG_1220.PNG",
    blurb:
      "A dirt-floor, leaking cellar transformed into dry, usable square footage. We dug the drainage, set the sump, rebuilt the failing block, and finished with a clean poured slab and new concrete stairs.",
    did: [
      "Interior French drain & sump pump",
      "Rebuilt block foundation walls",
      "Poured concrete floor & stairs",
      "Full moisture control",
    ],
    gallery: [
      "/gallery/basements/IMG_2487.JPEG",
      "/gallery/basements/IMG_2185.JPG",
      "/gallery/basements/IMG_2184.JPG",
      "/gallery/basements/IMG_2539.JPEG",
      "/gallery/basements/IMG_2614.JPEG",
      "/gallery/basements/IMG_1219.PNG",
    ],
  },
];
