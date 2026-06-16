import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { getMergedGalleryData } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See real project photos from Creative Space Construction — basements, kitchens, bathrooms, decks, and more across Connecticut.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const projects = await getMergedGalleryData();
  return <GalleryClient projects={projects} />;
}
