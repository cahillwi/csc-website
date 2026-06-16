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
  {
    id: "kitchen-1",
    type: "kitchens",
    typeLabel: "Kitchen Remodel",
    title: "Full kitchen renovation",
    location: "West Hartford, CT",
    cover: "",
    blurb:
      "A dated, closed-off kitchen opened up into a bright, modern space with custom cabinetry and a large center island.",
    did: [
      "Custom cabinets & quartz counters",
      "Tile floor & backsplash",
      "New lighting & fixtures",
      "Reconfigured open layout",
    ],
  },
  {
    id: "kitchen-2",
    type: "kitchens",
    typeLabel: "Kitchen Remodel",
    title: "Modern white kitchen",
    location: "Glastonbury, CT",
    cover: "",
    blurb:
      "A clean, timeless white kitchen with shaker cabinets, quartz counters, and updated appliances.",
    did: [
      "Shaker cabinetry",
      "Quartz countertops",
      "Subway tile backsplash",
      "Under-cabinet lighting",
    ],
  },
  {
    id: "bath-1",
    type: "bathrooms",
    typeLabel: "Bathroom Remodel",
    title: "Spa-style bath remodel",
    location: "Manchester, CT",
    cover: "",
    blurb:
      "A cramped, dated bathroom reimagined as a calm, spa-like retreat built around a walk-in tile shower.",
    did: [
      "Walk-in tile shower",
      "Double vanity",
      "Heated tile floor",
      "New plumbing & fixtures",
    ],
  },
  {
    id: "bath-2",
    type: "bathrooms",
    typeLabel: "Bathroom Remodel",
    title: "Guest bath refresh",
    location: "Newington, CT",
    cover: "",
    blurb:
      "A quick-turn refresh that modernized a tired guest bath without blowing the budget.",
    did: [
      "New vanity & mirror",
      "Tub & tile surround",
      "Fresh paint & trim",
      "Updated fixtures",
    ],
  },
  {
    id: "deck-1",
    type: "decks",
    typeLabel: "Deck Build",
    title: "Composite back deck",
    location: "Wethersfield, CT",
    cover: "",
    blurb:
      "A low-maintenance composite deck built for summers of entertaining, with built-in bench seating.",
    did: [
      "Composite decking & railings",
      "Built-in bench seating",
      "Stairs to yard",
      "Hidden fasteners",
    ],
  },
  {
    id: "deck-2",
    type: "decks",
    typeLabel: "Patio Build",
    title: "Paver patio & firepit",
    location: "Farmington, CT",
    cover: "",
    blurb:
      "A paver patio with a built-in firepit and seat wall that extended the living space outdoors.",
    did: [
      "Paver patio",
      "Built-in firepit",
      "Seat wall",
      "Landscape grading",
    ],
  },
  {
    id: "interior-1",
    type: "interiors",
    typeLabel: "Interior Renovation",
    title: "Whole-floor hardwood & paint",
    location: "Rocky Hill, CT",
    cover: "",
    blurb:
      "New hardwood and a fresh, modern palette brought an entire first floor back to life.",
    did: [
      "New hardwood flooring",
      "Drywall repair & skim coat",
      "Full interior paint",
      "New trim & doors",
    ],
  },
  {
    id: "interior-2",
    type: "interiors",
    typeLabel: "Finish Carpentry",
    title: "Living room built-ins",
    location: "West Hartford, CT",
    cover: "",
    blurb:
      "Custom built-in shelving and a shiplap accent wall added both character and real storage.",
    did: [
      "Custom built-in shelving",
      "Shiplap accent wall",
      "Trim & crown molding",
      "Paint & finish",
    ],
  },
];
