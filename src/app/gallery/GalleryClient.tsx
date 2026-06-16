"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import {
  categoryLabels,
  type GalleryCategory,
  type MergedGalleryProject,
} from "@/data/gallery";

type FilterKey = "all" | GalleryCategory;

const filterOptions: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Work" },
  ...Object.entries(categoryLabels).map(([key, label]) => ({
    key: key as GalleryCategory,
    label,
  })),
];

function PlaceholderCover({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#ECE3D4,#ECE3D4_14px,#E4D9C6_14px,#E4D9C6_28px)] flex items-end p-3.5">
      <span className="font-mono text-[11.5px] text-white bg-[rgba(22,19,15,0.78)] py-[7px] px-3 rounded-full">
        {label}
      </span>
    </div>
  );
}

export default function GalleryClient({
  projects,
}: {
  projects: MergedGalleryProject[];
}) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = projects.filter(
    (p) => filter === "all" || p.type === filter
  );

  const active = projects.find((p) => p.id === openId) ?? null;

  const openModal = useCallback((id: string) => {
    document.body.style.overflow = "hidden";
    setOpenId(id);
  }, []);

  const closeModal = useCallback(() => {
    document.body.style.overflow = "";
    setOpenId(null);
  }, []);

  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, closeModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[radial-gradient(120%_150%_at_80%_0%,#FFFDF8_0%,#FAF6EF_50%,#F3EBDD_100%)] border-b border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 pt-[clamp(40px,5.5vw,72px)] pb-[clamp(26px,3vw,36px)]">
          <div className="inline-flex items-center gap-[9px] bg-white border border-border-header rounded-full py-[7px] px-[15px] mb-5 animate-csc-fade">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="font-heading font-semibold text-[13.5px] tracking-[2px] uppercase text-text-muted">
              Our Work
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92] tracking-tight uppercase text-dark mb-4">
            See the work
            <br />
            <span className="text-orange">for yourself</span>
          </h1>
          <p className="text-[clamp(1.05rem,1.6vw,1.28rem)] text-text-secondary max-w-[600px] [text-wrap:pretty]">
            Real projects across Connecticut. Filter by type, then tap any
            project to see the before, the after, and how it came together.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-cream">
        <div className="max-w-[1200px] mx-auto px-7 pt-[clamp(26px,3.5vw,40px)] pb-[clamp(54px,7vw,90px)]">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2.5 mb-[clamp(26px,3.5vw,40px)]">
            {filterOptions.map((f) => {
              const count =
                f.key === "all"
                  ? projects.length
                  : projects.filter((p) => p.type === f.key).length;
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`font-heading font-semibold text-[15px] tracking-wider uppercase py-[9px] px-[17px] rounded-full transition-all ${
                    isActive
                      ? "bg-orange border border-orange text-white"
                      : "bg-white border border-[#E2D8C7] text-nav-text hover:border-[#C9BCA6]"
                  }`}
                >
                  {f.label}{" "}
                  <span className="opacity-55 font-bold">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[22px]">
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() => openModal(p.id)}
                className="bg-white border border-border rounded-2xl overflow-hidden cursor-pointer text-left transition-all hover:-translate-y-[5px] hover:shadow-[0_22px_40px_-22px_rgba(22,19,15,0.42)] hover:border-[#E0D2BC] flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <PlaceholderCover
                      label={`${p.typeLabel.toLowerCase()} — after`}
                    />
                  )}
                  <span className="absolute top-3 left-3 font-heading font-bold text-xs tracking-wider uppercase bg-[rgba(250,246,239,0.94)] text-dark py-[5px] px-[11px] rounded-md">
                    {p.typeLabel}
                  </span>
                  {p.cover && !p.isDriveGallery && (
                    <span className="absolute top-3 right-3 font-heading font-bold text-xs tracking-wider uppercase bg-orange text-white py-[5px] px-[11px] rounded-md">
                      Case Study
                    </span>
                  )}
                  {p.isDriveGallery && p.driveImages && (
                    <span className="absolute top-3 right-3 font-heading font-bold text-xs tracking-wider uppercase bg-dark text-white py-[5px] px-[11px] rounded-md">
                      {p.driveImages.length} Photos
                    </span>
                  )}
                </div>
                <div className="p-[18px_20px_20px] flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-[21px] tracking-wide uppercase text-dark leading-tight mb-[5px]">
                    {p.title}
                  </h3>
                  <div className="text-[13.5px] text-text-light flex items-center gap-1.5 mb-3.5">
                    <span className="text-orange">&#9678;</span> {p.location}
                  </div>
                  <span className="mt-auto font-heading font-bold text-[14.5px] tracking-wider uppercase text-orange inline-flex items-center gap-[7px]">
                    View project &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(232,119,34,0.05),rgba(232,119,34,0.05)_26px,transparent_26px,transparent_52px)]" />
        <div className="relative max-w-[1100px] mx-auto px-7 py-[clamp(56px,7vw,100px)] text-center">
          <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-4">
            Your project could be next
          </div>
          <h2 className="font-heading font-extrabold text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[0.95] tracking-tight uppercase text-white max-w-[760px] mx-auto mb-5">
            Let&rsquo;s build yours
          </h2>
          <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] text-text-footer-light max-w-[560px] mx-auto mb-[34px] [text-wrap:pretty]">
            Tell us what you have in mind and get an honest, no-pressure
            estimate &mdash; usually within a day or two.
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
              className="font-heading font-bold text-[19px] tracking-wider uppercase bg-transparent text-white py-4 px-9 rounded-[9px] border-[1.5px] border-[#3A352D] hover:border-orange hover:text-orange inline-flex items-center gap-2.5 transition-all"
            >
              <span>&#9742;</span> (860) 488-1427
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {active && <ProjectModal project={active} onClose={closeModal} />}
    </>
  );
}

function ProjectModal({
  project: p,
  onClose,
}: {
  project: MergedGalleryProject;
  onClose: () => void;
}) {
  const isDriveOnly = p.isDriveGallery;
  const allPhotos = [
    ...(p.gallery ?? []).map((src) => ({ src, isDrive: false })),
    ...(p.driveImages ?? []).map((img) => ({ src: img.url, isDrive: true })),
  ];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div
      className="fixed inset-0 z-[120] bg-[rgba(16,14,11,0.74)] backdrop-blur-[3px] flex items-start justify-center p-[clamp(12px,4vw,48px)] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-cream w-full max-w-[880px] rounded-[18px] overflow-hidden shadow-[0_40px_90px_-28px_rgba(0,0,0,0.6)] animate-csc-fade m-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-[26px_28px] bg-dark text-white">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-[38px] h-[38px] rounded-[9px] border border-footer-border bg-footer-card text-white text-xl leading-none cursor-pointer hover:bg-orange hover:border-orange transition-colors"
          >
            &times;
          </button>
          <div className="font-heading font-bold text-[13px] tracking-[2px] uppercase text-orange mb-2">
            {p.typeLabel}
          </div>
          <h3 className="font-heading font-extrabold text-[clamp(1.7rem,3.4vw,2.4rem)] leading-none tracking-tight uppercase text-white max-w-[90%] mb-2">
            {p.title}
          </h3>
          <div className="text-sm text-utility-text flex items-center gap-[7px]">
            <span className="text-orange">&#9678;</span> {p.location}
          </div>
        </div>

        <div className="p-[clamp(20px,3vw,30px)]">
          {/* Before / After — only for case study projects */}
          {!isDriveOnly && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[13px] mb-6">
              <figure className="m-0">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border-card bg-[repeating-linear-gradient(45deg,#C9BDA8,#C9BDA8_13px,#BCAF98_13px,#BCAF98_26px)]">
                  {p.beforeImg && (
                    <Image
                      src={p.beforeImg}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  )}
                  <span className="absolute top-2.5 left-2.5 font-heading font-bold text-xs tracking-[1.3px] uppercase bg-[#6B6053] text-white py-[5px] px-[11px] rounded-md">
                    Before
                  </span>
                </div>
              </figure>
              <figure className="m-0">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border-card bg-[repeating-linear-gradient(45deg,#ECE3D4,#ECE3D4_13px,#E4D9C6_13px,#E4D9C6_26px)]">
                  {p.afterImg && (
                    <Image
                      src={p.afterImg}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                  )}
                  <span className="absolute top-2.5 left-2.5 font-heading font-bold text-xs tracking-[1.3px] uppercase bg-orange text-white py-[5px] px-[11px] rounded-md">
                    After
                  </span>
                </div>
              </figure>
            </div>
          )}

          {/* Description */}
          {p.blurb && (
            <p className="text-[16.5px] leading-[1.65] text-[#3C352C] mb-[22px] [text-wrap:pretty]">
              {p.blurb}
            </p>
          )}

          {/* What we did — only for case study projects */}
          {p.did.length > 0 && (
            <>
              <div className="font-heading font-bold text-[13px] tracking-[1.8px] uppercase text-text-light mb-3">
                What we did
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[9px_22px] mb-[26px]">
                {p.did.map((d) => (
                  <div
                    key={d}
                    className="flex items-start gap-2.5 text-[15.5px] text-[#3C352C]"
                  >
                    <span className="text-orange font-bold shrink-0">
                      &#10003;
                    </span>{" "}
                    {d}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Photo grid */}
          {allPhotos.length > 0 && (
            <>
              <div className="font-heading font-bold text-[13px] tracking-[1.8px] uppercase text-text-light mb-3">
                {isDriveOnly ? "Project photos" : "From the job"}
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2.5 mb-7">
                {allPhotos.map((photo, i) => (
                  <button
                    key={photo.src}
                    onClick={() => setLightboxIndex(i)}
                    className="aspect-square rounded-[10px] overflow-hidden border border-border-card cursor-pointer transition-transform hover:scale-105"
                  >
                    <Image
                      src={photo.src}
                      alt={`${p.title} photo ${i + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}

          <Link
            href="/contact"
            className="inline-flex items-center gap-[9px] font-heading font-bold text-[17px] tracking-wider uppercase bg-orange text-white py-3.5 px-7 rounded-[9px] shadow-[0_8px_20px_rgba(232,119,34,0.3)] hover:bg-orange-dark hover:-translate-y-0.5 transition-all"
          >
            Start a project like this &rarr;
          </Link>
        </div>
      </div>
      {lightboxIndex !== null && allPhotos.length > 0 && (
        <Lightbox
          images={allPhotos.map((photo) => photo.src)}
          startIndex={lightboxIndex}
          title={p.title}
          location={p.location}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
