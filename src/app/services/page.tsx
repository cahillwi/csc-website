import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kitchen & bath remodels, basement finishing & waterproofing, decks & patios, interior renovations, and handyman services across Connecticut.",
};

const categories = [
  { id: "remodels", label: "Kitchen & Bath" },
  { id: "basements", label: "Basements & Waterproofing" },
  { id: "decks", label: "Decks & Patios" },
  { id: "interior", label: "Interior Renovations" },
  { id: "additions", label: "Additions & Repairs" },
  { id: "handyman", label: "Handyman" },
];

type ServiceImage = {
  label: string;
  tall?: boolean;
  offset?: boolean;
  wide?: boolean;
};

const services: {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  items: string[];
  images?: ServiceImage[];
  realPhotos?: boolean;
  reversed: boolean;
  bg: string;
}[] = [
  {
    id: "remodels",
    number: "01",
    tag: "Remodels",
    title: "Kitchen & Bath Remodels",
    description:
      "The rooms you use most, rebuilt to fit how you actually live. We handle demo to final fixtures — so the finished space is exactly what you pictured, with no loose ends.",
    items: [
      "Custom cabinetry & countertops",
      "Tile floors, showers & backsplashes",
      "Plumbing & fixture upgrades",
      "Lighting, layout & refinishing",
    ],
    images: [
      { label: "kitchen remodel — after", tall: true },
      { label: "bath vanity" },
      { label: "tile detail" },
    ],
    reversed: false,
    bg: "bg-white",
  },
  {
    id: "basements",
    number: "02",
    tag: "Basements",
    title: "Basements & Waterproofing",
    description:
      "A wet, dirt-floor cellar turned into dry, usable square footage. We dig the drainage, set the sump, rebuild the block, and pour a clean slab — the kind of foundation work that protects the whole house.",
    items: [
      "Interior French drains & sump pumps",
      "Foundation & stone-wall repair",
      "Poured concrete floors & block walls",
      "Moisture control & full finishing",
    ],
    realPhotos: true,
    reversed: true,
    bg: "bg-cream border-t border-border-light",
  },
  {
    id: "decks",
    number: "03",
    tag: "Outdoor",
    title: "Decks & Patios",
    description:
      "Outdoor living space built to take a Connecticut winter and still look great in July. Solid framing, clean rails, and materials that hold up season after season.",
    items: [
      "Pressure-treated & composite decks",
      "Paver patios & walkways",
      "Railings, stairs & built-in seating",
      "Pergolas & outdoor structures",
    ],
    images: [
      { label: "composite deck build" },
      { label: "paver patio", offset: true },
    ],
    reversed: false,
    bg: "bg-white border-t border-border-light",
  },
  {
    id: "interior",
    number: "04",
    tag: "Interiors",
    title: "Interior Renovations",
    description:
      "The finishing trades that make a house feel cared for — flooring, drywall, paint, and trim done with a craftsman’s eye for the details most people only notice when they’re wrong.",
    items: [
      "Hardwood, tile & vinyl flooring",
      "Drywall, taping & skim coating",
      "Interior & trim painting",
      "Crown molding & finish carpentry",
    ],
    images: [
      { label: "new hardwood floor" },
      { label: "trim & paint" },
    ],
    reversed: true,
    bg: "bg-cream border-t border-border-light",
  },
  {
    id: "additions",
    number: "05",
    tag: "Structural",
    title: "Additions & Structural Repairs",
    description:
      "Need more room or worried about something that’s sagging? We build small additions and make the structural fixes that keep a home solid — permitted and done to code.",
    items: [
      "Small additions & bump-outs",
      "Beam, joist & post replacement",
      "Load-bearing & framing repairs",
      "Permits handled, code-compliant",
    ],
    images: [{ label: "home addition framing", wide: true }],
    reversed: false,
    bg: "bg-white border-t border-border-light",
  },
  {
    id: "handyman",
    number: "06",
    tag: "Everyday Fixes",
    title: "Handyman & Repairs",
    description:
      "No job too small. The running list of little fixes that never quite gets done — handled in one visit by someone who actually knows what they’re doing.",
    items: [
      "Doors, windows & hardware",
      "Drywall patches & small fixes",
      "Shelving, mounting & assembly",
      "Honey-do lists, knocked out",
    ],
    images: [{ label: "trim & door repair", wide: true }],
    reversed: true,
    bg: "bg-cream border-t border-border-light",
  },
];

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`relative rounded-[14px] border border-border-card bg-[repeating-linear-gradient(45deg,#ECE3D4,#ECE3D4_14px,#E4D9C6_14px,#E4D9C6_28px)] overflow-hidden flex items-end p-3.5 ${className}`}
    >
      <span className="font-mono text-[11.5px] text-white bg-[rgba(22,19,15,0.78)] py-[7px] px-3 rounded-full">
        {label}
      </span>
    </div>
  );
}

function BeforeAfterHover() {
  return (
    <div>
      <div className="relative aspect-[4/3] rounded-2xl border border-border-card overflow-hidden shadow-[0_26px_50px_-26px_rgba(22,19,15,0.5)] cursor-pointer group">
        <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
          <Image
            src="/gallery/basements/IMG_2491.JPEG"
            alt="Basement during excavation"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Image
            src="/gallery/basements/IMG_1220.PNG"
            alt="Finished basement with poured concrete floor"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="absolute top-0 left-0 whitespace-nowrap font-heading font-bold text-[13px] tracking-widest uppercase bg-[#6B6053] text-white py-1.5 px-3 rounded-md transition-opacity duration-400 group-hover:opacity-0">
            Before
          </span>
          <span className="absolute top-0 left-0 whitespace-nowrap font-heading font-bold text-[13px] tracking-widest uppercase bg-orange text-white py-1.5 px-3 rounded-md opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            After
          </span>
        </div>
        <div className="absolute bottom-3.5 right-3.5 flex items-center gap-2 bg-[rgba(22,19,15,0.82)] text-white font-heading font-semibold text-[12.5px] tracking-wider uppercase py-[7px] px-[13px] rounded-full whitespace-nowrap transition-all duration-350 group-hover:opacity-0 group-hover:translate-y-1.5 z-10">
          <span className="text-orange text-[14px]">&#8596;</span> Hover for
          the after
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3.5">
        <figure className="m-0">
          <div className="relative aspect-square rounded-[11px] overflow-hidden border border-border-card">
            <Image
              src="/gallery/basements/IMG_2184.JPG"
              alt="Sump pump installation"
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="font-heading font-semibold text-[12.5px] tracking-wider uppercase text-text-muted mt-[7px] text-center">
            Sump system
          </figcaption>
        </figure>
        <figure className="m-0">
          <div className="relative aspect-square rounded-[11px] overflow-hidden border border-border-card">
            <Image
              src="/gallery/basements/IMG_2185.JPG"
              alt="Interior French drain"
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="font-heading font-semibold text-[12.5px] tracking-wider uppercase text-text-muted mt-[7px] text-center">
            French drain
          </figcaption>
        </figure>
        <figure className="m-0">
          <div className="relative aspect-square rounded-[11px] overflow-hidden border border-border-card">
            <Image
              src="/gallery/basements/IMG_2614.JPEG"
              alt="Poured concrete basement stairs"
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="font-heading font-semibold text-[12.5px] tracking-wider uppercase text-text-muted mt-[7px] text-center">
            New concrete stairs
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[radial-gradient(120%_150%_at_80%_0%,#FFFDF8_0%,#FAF6EF_50%,#F3EBDD_100%)] border-b border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 pt-[clamp(40px,5.5vw,72px)] pb-[clamp(28px,3.5vw,40px)]">
          <div className="inline-flex items-center gap-[9px] bg-white border border-border-header rounded-full py-[7px] px-[15px] mb-5 animate-csc-fade">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="font-heading font-semibold text-[13.5px] tracking-[2px] uppercase text-text-muted">
              What We Do
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92] tracking-tight uppercase text-dark mb-4">
            Services for every
            <br />
            <span className="text-orange">corner of your home</span>
          </h1>
          <p className="text-[clamp(1.05rem,1.6vw,1.28rem)] text-text-secondary max-w-[600px]">
            From a leaky basement to a brand-new kitchen, we handle the whole
            job — planning, permits, and the hands-on work. Pick a category to
            see what&rsquo;s included.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-7">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="font-heading font-semibold text-[15px] tracking-wider uppercase bg-white border border-[#E2D8C7] text-nav-text py-[9px] px-4 rounded-full hover:border-orange hover:text-orange transition-colors"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((svc) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`${svc.bg} scroll-mt-[84px]`}
        >
          <div className="max-w-[1200px] mx-auto px-7 py-[clamp(48px,6vw,86px)]">
            <div
              className={`grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[clamp(30px,5vw,60px)] items-center ${
                svc.reversed ? "[&>*:last-child]:lg:-order-1" : ""
              }`}
            >
              {/* Text */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-heading font-bold text-[14px] tracking-[2.4px] uppercase text-orange">
                    {svc.number} &mdash; {svc.tag}
                  </span>
                  {svc.realPhotos && (
                    <span className="font-heading font-bold text-[11.5px] tracking-wider uppercase text-white bg-dark py-[3px] px-[9px] rounded-[5px]">
                      Real project
                    </span>
                  )}
                </div>
                <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-none tracking-tight uppercase text-dark mb-4">
                  {svc.title}
                </h2>
                <p className="text-[16.5px] leading-relaxed text-text-secondary max-w-[520px] mb-[22px]">
                  {svc.description}
                </p>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-[11px] mb-7">
                  {svc.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-[15.5px] text-[#3C352C]"
                    >
                      <span className="text-orange font-bold shrink-0">
                        &#10003;
                      </span>{" "}
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-[9px] font-heading font-bold text-[17px] tracking-wider uppercase bg-orange text-white py-[13px] px-[26px] rounded-[9px] shadow-[0_8px_20px_rgba(232,119,34,0.3)] hover:bg-orange-dark hover:-translate-y-0.5 transition-all"
                >
                  Request a Quote &rarr;
                </Link>
              </div>

              {/* Media */}
              <div>
                {svc.realPhotos ? (
                  <BeforeAfterHover />
                ) : svc.images && svc.images.length === 3 ? (
                  <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[auto_auto] gap-3.5">
                    <Placeholder
                      label={svc.images[0].label}
                      className="row-span-2 aspect-[3/4]"
                    />
                    <Placeholder
                      label={svc.images[1].label}
                      className="aspect-[4/3]"
                    />
                    <Placeholder
                      label={svc.images[2].label}
                      className="aspect-[4/3]"
                    />
                  </div>
                ) : svc.images && svc.images.length === 2 && svc.images[1]?.offset ? (
                  <div className="grid grid-cols-2 gap-3.5">
                    <Placeholder
                      label={svc.images[0].label}
                      className="aspect-[3/4]"
                    />
                    <Placeholder
                      label={svc.images[1].label}
                      className="aspect-[3/4] mt-[26px]"
                    />
                  </div>
                ) : svc.images && svc.images.length === 2 ? (
                  <div className="grid grid-cols-2 gap-3.5">
                    <Placeholder
                      label={svc.images[0].label}
                      className="aspect-square"
                    />
                    <Placeholder
                      label={svc.images[1].label}
                      className="aspect-square"
                    />
                  </div>
                ) : svc.images && svc.images.length === 1 ? (
                  <Placeholder
                    label={svc.images[0].label}
                    className="aspect-[4/3]"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(232,119,34,0.05),rgba(232,119,34,0.05)_26px,transparent_26px,transparent_52px)]" />
        <div className="relative max-w-[1100px] mx-auto px-7 py-[clamp(56px,7vw,100px)] text-center">
          <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-4">
            Not sure which one you need?
          </div>
          <h2 className="font-heading font-extrabold text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[0.95] tracking-tight uppercase text-white max-w-[760px] mx-auto mb-5">
            Tell us about your project
          </h2>
          <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] text-text-footer-light max-w-[560px] mx-auto mb-[34px]">
            Describe what you&rsquo;re thinking and get an honest, no-pressure
            estimate — usually within a day or two.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              href="/contact"
              className="font-heading font-bold text-[19px] tracking-wider uppercase bg-orange text-white py-4 px-9 rounded-[9px] shadow-[0_12px_30px_rgba(232,119,34,0.4)] hover:bg-[#F0832F] hover:-translate-y-0.5 transition-all"
            >
              Get a Free Estimate
            </Link>
            <a
              href="tel:+18604881427"
              className="font-heading font-bold text-[19px] tracking-wider uppercase bg-transparent text-white py-4 px-9 rounded-[9px] border-[1.5px] border-[#3A352D] inline-flex items-center gap-2.5 hover:border-orange hover:text-orange transition-all"
            >
              <span>&#9742;</span> (860) 488-1427
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
