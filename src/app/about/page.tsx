import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConnecticutMap from "@/components/ConnecticutMap";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Creative Space Construction — owner-operated, licensed & insured, proudly serving Connecticut homeowners.",
};

const towns = [
  "New Milford",
  "Kent",
  "Sherman",
  "Brookfield",
  "Danbury",
  "Torrington",
  "Litchfield",
  "Washington",
];

const values = [
  {
    num: "01",
    title: "Real Craftsmanship",
    text: "Tight joints, clean lines, and work that holds up. We’d rather do it right than do it twice.",
  },
  {
    num: "02",
    title: "We Show Up",
    text: "On time, with a clear plan and honest updates from the first visit to the final walk-through.",
  },
  {
    num: "03",
    title: "Your Home, Respected",
    text: "Drop cloths down, dust controlled, and the site left clean at the end of every day.",
  },
  {
    num: "04",
    title: "Honest Pricing",
    text: "Detailed, no-pressure estimates. The number we quote is the number you pay.",
  },
];

const credentials = [
  {
    label: "CT Registered",
    value: "HIC.0703549",
    valueColor: "text-orange",
    text: "Home Improvement Contractor registered with the State of Connecticut.",
  },
  {
    label: "Coverage",
    value: "Fully Insured",
    valueColor: "text-white",
    text: "General liability coverage on every job — certificate available on request.",
  },
  {
    label: "No Risk",
    value: "Free Estimates",
    valueColor: "text-white",
    text: "Honest quotes with no deposit and no obligation to move forward.",
  },
  {
    label: "Hometown",
    value: "Local to CT",
    valueColor: "text-white",
    text: "Based in New Milford and proud to work across Litchfield County and beyond.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[radial-gradient(120%_150%_at_82%_0%,#FFFDF8_0%,#FAF6EF_50%,#F3EBDD_100%)] border-b border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(40px,5.5vw,80px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[clamp(30px,5vw,60px)] items-center">
            <div className="animate-csc-fade">
              <div className="inline-flex items-center gap-[9px] bg-white border border-border-header rounded-full py-[7px] px-[15px] mb-5">
                <span className="w-2 h-2 rounded-full bg-orange" />
                <span className="font-heading font-semibold text-[13.5px] tracking-[2px] uppercase text-text-muted">
                  Our Story
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92] tracking-tight uppercase text-dark mb-[18px]">
                We build it like
                <br />
                <span className="text-orange">it&rsquo;s our own home</span>
              </h1>
              <p className="text-[clamp(1.05rem,1.6vw,1.26rem)] text-text-secondary max-w-[540px] mb-7 [text-wrap:pretty]">
                Creative Space Construction started with a simple idea:
                homeowners deserve a builder who actually shows up, does the
                work, and stands behind it. No call centers, no runaround
                &mdash; just honest craftsmanship from people who sweat the
                details.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="font-heading font-bold text-[18px] tracking-wider uppercase bg-orange text-white py-[15px] px-[30px] rounded-[9px] shadow-[0_10px_26px_rgba(232,119,34,0.34)] hover:bg-orange-dark hover:-translate-y-0.5 transition-all"
                >
                  Get a Free Estimate
                </Link>
                <Link
                  href="/gallery"
                  className="font-heading font-bold text-[18px] tracking-wider uppercase bg-white text-dark py-[15px] px-[30px] rounded-[9px] border-[1.5px] border-[#DCD2C2] hover:border-dark hover:-translate-y-0.5 transition-all"
                >
                  See Our Work
                </Link>
              </div>
            </div>

            <div className="animate-csc-fade-delay max-w-[440px] mx-auto relative">
              <div className="relative aspect-[4/4.4] rounded-[18px] border border-border-card overflow-hidden shadow-[0_30px_60px_-28px_rgba(22,19,15,0.45)]">
                <Image
                  src="/images/dan_headshot.png"
                  alt="Owner of Creative Space Construction"
                  fill
                  className="object-cover object-[center_28%]"
                  priority
                />
              </div>
              <div className="absolute bottom-[-22px] left-[-18px] w-[46%] rounded-[13px] overflow-hidden border-[3px] border-cream shadow-[0_18px_34px_-14px_rgba(22,19,15,0.5)]">
                <Image
                  src="/gallery/basements/60918419028__025A1461-9DE9-4E0C-AA15-D0679FB06743.JPG"
                  alt="On the job — foundation work in Connecticut"
                  width={400}
                  height={300}
                  className="w-full aspect-[4/3] object-cover block"
                />
              </div>
              <div className="absolute top-[-14px] right-[-12px] bg-dark text-white rounded-xl py-3 px-[15px] shadow-[0_16px_30px_-12px_rgba(22,19,15,0.6)] text-center">
                <div className="font-heading font-semibold text-[10.5px] tracking-[1.6px] uppercase text-utility-text">
                  CT Licensed
                </div>
                <div className="font-heading font-extrabold text-[18px] tracking-wide text-orange mt-0.5">
                  HIC.0703549
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(50px,6.5vw,92px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-[clamp(30px,5vw,60px)] items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/gallery/basements/IMG_2539.JPEG"
                alt="Block foundation work on a recent Connecticut basement"
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover rounded-2xl border border-border-card shadow-[0_24px_48px_-26px_rgba(22,19,15,0.45)]"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="font-heading font-bold text-sm tracking-[2.4px] uppercase text-orange mb-3.5">
                Why We Started
              </div>
              <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.8vw,3rem)] leading-none tracking-tight uppercase text-dark mb-5">
                Tired of the runaround, so we built the opposite
              </h2>
              <div className="flex flex-col gap-4 text-[16.5px] leading-[1.7] text-[#4C4438] max-w-[560px]">
                <p className="[text-wrap:pretty]">
                  After years on job sites across Connecticut &mdash; framing,
                  finishing, foundations, the whole trade &mdash; we kept seeing
                  the same thing: homeowners burned by big outfits that
                  overpromised, sent a salesman, then handed the job to whoever
                  was cheapest that week.
                </p>
                <p className="[text-wrap:pretty]">
                  Creative Space was built to be the opposite. The person who
                  quotes your project is the person on the tools. We keep our
                  schedule tight, our crew small and skilled, and our
                  communication straight &mdash; so you always know what&rsquo;s
                  happening in your home.
                </p>
                <p className="[text-wrap:pretty] font-semibold text-dark">
                  That&rsquo;s the whole philosophy: treat every house like
                  it&rsquo;s our own, and leave it better than we found it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream border-t border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(50px,6.5vw,92px)]">
          <div className="max-w-[620px] mb-[clamp(32px,4vw,50px)]">
            <div className="font-heading font-bold text-sm tracking-[2.4px] uppercase text-orange mb-3.5">
              What We Stand For
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.8vw,3rem)] leading-none tracking-tight uppercase text-dark">
              Four things we don&rsquo;t cut corners on
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
            {values.map((v) => (
              <div
                key={v.num}
                className="bg-white border border-border rounded-2xl p-7"
              >
                <div className="font-heading font-extrabold text-[34px] leading-none text-orange mb-4">
                  {v.num}
                </div>
                <h3 className="font-heading font-bold text-[21px] tracking-wide uppercase text-dark mb-[9px]">
                  {v.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-text-tertiary [text-wrap:pretty]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-dark text-[#E7DFD2]">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(50px,6.5vw,86px)]">
          <div className="flex flex-wrap items-end justify-between gap-[18px] mb-[clamp(28px,3.5vw,44px)]">
            <div className="max-w-[560px]">
              <div className="font-heading font-bold text-sm tracking-[2.4px] uppercase text-orange mb-3.5">
                Credentials
              </div>
              <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.8vw,3rem)] leading-none tracking-tight uppercase text-white">
                Licensed, insured, and accountable
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
            {credentials.map((c) => (
              <div
                key={c.label}
                className="bg-dark-section border border-[#2A251E] rounded-[14px] p-6"
              >
                <div className="font-heading font-bold text-[13px] tracking-[1.4px] uppercase text-[#9C9282] mb-2.5">
                  {c.label}
                </div>
                <div
                  className={`font-heading font-extrabold text-2xl tracking-wide ${c.valueColor}`}
                >
                  {c.value}
                </div>
                <p className="text-sm text-text-footer mt-2 leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-white border-t border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(50px,6.5vw,86px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-[clamp(30px,5vw,60px)] items-center">
            <div>
              <div className="font-heading font-bold text-sm tracking-[2.4px] uppercase text-orange mb-3.5">
                Where We Work
              </div>
              <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.8vw,3rem)] leading-none tracking-tight uppercase text-dark mb-[18px]">
                Proudly serving Connecticut
              </h2>
              <p className="text-[16.5px] leading-[1.65] text-text-secondary max-w-[520px] mb-6 [text-wrap:pretty]">
                Based in New Milford, we work with homeowners across
                Litchfield County and the surrounding area. Not sure if
                you&rsquo;re in range? Just ask &mdash; we&rsquo;re happy to
                let you know.
              </p>
              <div className="flex flex-wrap gap-[9px]">
                {towns.map((t) => (
                  <span
                    key={t}
                    className="font-heading font-semibold text-[15px] tracking-wider uppercase bg-cream border border-[#E2D8C7] text-[#3C352C] py-2 px-[15px] rounded-full"
                  >
                    {t}
                  </span>
                ))}
                <span className="font-heading font-semibold text-[15px] tracking-wider uppercase bg-dark text-white py-2 px-[15px] rounded-full">
                  &amp; surrounding towns
                </span>
              </div>
            </div>
            <div className="bg-cream border border-border rounded-2xl p-6">
              <ConnecticutMap />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream border-t border-border-light overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-7 py-[clamp(52px,7vw,92px)] text-center">
          <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-4">
            Let&rsquo;s build something
          </div>
          <h2 className="font-heading font-extrabold text-[clamp(2.3rem,5vw,4rem)] leading-[0.96] tracking-tight uppercase text-dark max-w-[740px] mx-auto mb-[18px]">
            Ready to talk through your project?
          </h2>
          <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] text-text-secondary max-w-[540px] mx-auto mb-8 [text-wrap:pretty]">
            Get an honest, no-pressure estimate &mdash; usually within a day or
            two. We&rsquo;d love to hear what you have in mind.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              href="/contact"
              className="font-heading font-bold text-[19px] tracking-wider uppercase bg-orange text-white py-4 px-9 rounded-[9px] shadow-[0_12px_30px_rgba(232,119,34,0.34)] hover:bg-orange-dark hover:-translate-y-0.5 transition-all"
            >
              Get a Free Estimate
            </Link>
            <a
              href="tel:+18604881427"
              className="font-heading font-bold text-[19px] tracking-wider uppercase bg-white text-dark py-4 px-9 rounded-[9px] border-[1.5px] border-[#DCD2C2] hover:border-dark inline-flex items-center gap-2.5 transition-all"
            >
              <span className="text-orange">&#9742;</span> (860) 488-1427
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
