import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See real project photos from Creative Space Construction — basements, kitchens, bathrooms, decks, and more across Connecticut.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
