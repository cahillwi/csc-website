import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free estimate from Creative Space Construction. Tell us about your project and we'll get back to you within 1-2 business days.",
};

export default function ContactPage() {
  return <ContactClient />;
}
