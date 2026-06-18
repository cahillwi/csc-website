import Image from "next/image";
import Link from "next/link";

const trustItems = [
  "Locally Owned & Operated",
  "Free Estimates",
  "Licensed & Insured",
  "Quality Craftsmanship",
];

const differentiators = [
  {
    icon: (
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={8} r={3.4} />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </svg>
    ),
    title: "You Talk to the Owner",
    desc: "No sales reps. No subcontractor runaround. The person who gives your estimate is the person doing the work.",
  },
  {
    icon: (
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.2-2.8 7.6-7 9-4.2-1.4-7-4.8-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Licensed & Insured",
    desc: "Fully insured and CT-registered (HIC.0703549). Real protection and real peace of mind on every job.",
  },
  {
    icon: (
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-7 9 7" />
        <rect x={6} y={11} width={12} height={9} rx={0} />
        <line x1={12} y1={14} x2={12} y2={20} />
      </svg>
    ),
    title: "Local & Free Estimates",
    desc: "Honest, no-pressure quotes for homeowners across Connecticut and the surrounding towns.",
  },
];

const services = [
  {
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x={4} y={4} width={7} height={7} rx={1} />
        <rect x={13} y={4} width={7} height={7} rx={1} />
        <rect x={4} y={13} width={7} height={7} rx={1} />
        <rect x={13} y={13} width={7} height={7} rx={1} />
      </svg>
    ),
    title: "Kitchen & Bath Remodels",
    desc: "Full and partial remodels — cabinets, counters, tile, fixtures, and layout.",
    anchor: "remodels",
  },
  {
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C8 8 6 11 6 14a6 6 0 0 0 12 0c0-3-2-6-6-11z" />
      </svg>
    ),
    title: "Basements & Waterproofing",
    desc: "Finishing, sump pumps, French drains, moisture control, and crack repair.",
    anchor: "basements",
  },
  {
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <line x1={3} y1={8} x2={21} y2={8} />
        <line x1={3} y1={13} x2={21} y2={13} />
        <line x1={3} y1={18} x2={21} y2={18} />
        <line x1={8} y1={8} x2={8} y2={18} />
        <line x1={16} y1={8} x2={16} y2={18} />
      </svg>
    ),
    title: "Decks & Patios",
    desc: "Custom decks, patios, and outdoor living spaces built to handle CT seasons.",
    anchor: "decks",
  },
  {
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x={8} y={3} width={8} height={6} rx={1.5} />
        <line x1={12} y1={9} x2={12} y2={20} />
      </svg>
    ),
    title: "Interior Renovations",
    desc: "Flooring, drywall, painting, trim, and the finishing details that matter.",
    anchor: "interior",
  },
  {
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V9l8-5 8 5v11" />
        <rect x={9} y={13} width={6} height={7} />
      </svg>
    ),
    title: "Additions & Repairs",
    desc: "Small additions and structural repairs that add real, lasting space.",
    anchor: "additions",
  },
  {
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <line x1={6} y1={18} x2={18} y2={6} />
        <line x1={6} y1={6} x2={18} y2={18} />
      </svg>
    ),
    title: "Handyman & Repairs",
    desc: "The fix-it list you keep putting off — done right the first time.",
    anchor: "handyman",
  },
];

const reviews = [
  {
    quote:
      "Creative Space finished our basement and it instantly became our favorite room in the house. Clean, on time, and the price was exactly what they quoted.",
    name: "Sarah M.",
    town: "West Hartford, CT",
  },
  {
    quote:
      "They showed up when they said they would and treated our home like it was their own. No runaround, no surprise charges. Just solid work.",
    name: "Mike & Janet R.",
    town: "Glastonbury, CT",
  },
  {
    quote:
      "Re-did our kitchen start to finish. They handled everything and kept us in the loop the whole way. Could not recommend them more.",
    name: "The Coleman Family",
    town: "Manchester, CT",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(120%_140%_at_85%_0%,#FFFDF8_0%,#FAF6EF_45%,#F3EBDD_100%)]">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(40px,6vw,84px)] pb-[clamp(48px,6vw,90px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(34px,5vw,64px)] items-center">
          <div className="animate-csc-fade">
            {/* Badge */}
            <div className="inline-flex items-center gap-[9px] bg-white border border-border-header rounded-full py-[7px] px-[15px] mb-[22px]">
              <span className="w-2 h-2 rounded-full bg-orange" />
              <span className="font-heading font-semibold text-[13.5px] tracking-[2px] uppercase text-text-muted">
                Owner-Operated &middot; Connecticut
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-[clamp(2.8rem,7vw,5rem)] leading-[0.92] tracking-tight uppercase text-dark mb-[18px]">
              Built right.
              <br />
              <span className="text-orange">Built to last.</span>
            </h1>

            <p className="text-[clamp(1.05rem,1.6vw,1.28rem)] text-text-secondary max-w-[520px] mb-[30px]">
              Remodels, basements, decks, and repairs done by people who show
              up&nbsp;&mdash;{" "}
              <strong className="text-dark">
                no sales reps, no subcontractor runaround.
              </strong>{" "}
              You work directly with the craftsman on the job, start to finish.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="font-heading font-bold text-[18px] tracking-wider uppercase bg-orange text-white py-[15px] px-[30px] rounded-[9px] shadow-[0_10px_26px_rgba(232,119,34,0.36)] hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(232,119,34,0.46)] transition-all"
              >
                Get a Free Estimate
              </Link>
              <a
                href="tel:+18604881427"
                className="font-heading font-bold text-[18px] tracking-wider uppercase bg-white text-dark py-[15px] px-[30px] rounded-[9px] border-[1.5px] border-[#DCD2C2] inline-flex items-center gap-[9px] hover:border-dark hover:-translate-y-0.5 transition-all"
              >
                <span className="text-orange">&#9742;</span> (860) 488-1427
              </a>
            </div>

            <div className="flex flex-wrap gap-x-[26px] gap-y-[18px] mt-[30px]">
              <div className="flex items-center gap-2 text-[14.5px] text-text-muted font-medium">
                <span className="text-orange font-bold">&#10003;</span> Free,
                no-pressure estimates
              </div>
              <div className="flex items-center gap-2 text-[14.5px] text-text-muted font-medium">
                <span className="text-orange font-bold">&#10003;</span> Licensed
                &amp; fully insured
              </div>
            </div>
          </div>

          {/* Hero image placeholder with before/after hover */}
          <div className="relative animate-csc-fade-delay">
            <div className="relative aspect-[4/3.2] rounded-2xl border border-border-card shadow-[0_30px_60px_-28px_rgba(22,19,15,0.45)] overflow-hidden group cursor-pointer">
              <Image
                src="/gallery/basements/IMG_2491.JPEG"
                alt="Unfinished dirt-floor basement before renovation"
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <Image
                src="/gallery/basements/IMG_1220.PNG"
                alt="Finished basement with poured concrete floor after renovation"
                fill
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <span className="absolute top-4 left-4 font-heading font-bold text-[14px] tracking-widest uppercase bg-[#6B6053] text-white py-1.5 px-[13px] rounded-md transition-opacity duration-400 group-hover:opacity-0 z-10">
                Before
              </span>
              <span className="absolute top-4 left-4 font-heading font-bold text-[14px] tracking-widest uppercase bg-orange text-white py-1.5 px-[13px] rounded-md opacity-0 transition-opacity duration-400 group-hover:opacity-100 z-10">
                After
              </span>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-[rgba(22,19,15,0.82)] text-white font-heading font-semibold text-[13px] tracking-wider uppercase py-2 px-[15px] rounded-full whitespace-nowrap transition-all duration-350 group-hover:opacity-0 group-hover:translate-y-1.5 z-10">
                <span className="text-orange text-[15px]">&#8596;</span> Hover
                to see the after
              </div>
            </div>

            <div className="absolute -bottom-[18px] -right-1.5 bg-dark text-white rounded-[13px] py-[15px] px-[18px] shadow-[0_16px_34px_-12px_rgba(22,19,15,0.6)] max-w-[215px]">
              <div className="font-heading font-extrabold text-[30px] leading-none text-orange">
                10% OFF
              </div>
              <div className="text-[12.5px] text-[#D9D0C2] mt-[5px] leading-snug">
                your next project estimate — just mention this site
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-dark-section">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(22px,3vw,30px)] grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-[30px] gap-y-3.5">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-[13px]">
              <div className="w-[38px] h-[38px] rounded-[9px] bg-[rgba(232,119,34,0.14)] border border-[rgba(232,119,34,0.4)] flex items-center justify-center shrink-0 text-orange font-extrabold text-[19px]">
                &#10003;
              </div>
              <span className="font-heading font-bold text-[17px] tracking-wider uppercase text-[#F4EFE6] leading-tight">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CREATIVE SPACE */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(54px,7vw,96px)]">
          <div className="max-w-[620px] mb-[clamp(34px,4vw,52px)]">
            <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-3.5">
              Why Creative Space
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.2rem)] leading-none tracking-tight uppercase text-dark mb-4">
              A real person, not a faceless contractor
            </h2>
            <p className="text-[clamp(1rem,1.4vw,1.18rem)] text-text-secondary">
              Hiring someone to work in your home is personal. With Creative
              Space, you get one accountable craftsman from the first handshake
              to the final walk-through.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[22px]">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="bg-cream border border-border rounded-2xl py-[30px] px-7"
              >
                <div className="w-14 h-14 rounded-xl bg-dark text-orange flex items-center justify-center mb-5">
                  {d.icon}
                </div>
                <h3 className="font-heading font-bold text-[23px] tracking-wide uppercase text-dark mb-2.5">
                  {d.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-text-tertiary">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="bg-cream border-t border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(54px,7vw,96px)]">
          <div className="flex flex-wrap items-end justify-between gap-5 mb-[clamp(32px,4vw,48px)]">
            <div className="max-w-[620px]">
              <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-3.5">
                What We Do
              </div>
              <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.2rem)] leading-none tracking-tight uppercase text-dark">
                Services built around your home
              </h2>
            </div>
            <Link
              href="/services"
              className="font-heading font-bold text-[16px] tracking-wider uppercase text-dark border-b-2 border-orange pb-[3px] hover:text-orange transition-colors"
            >
              View all services &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {services.map((s) => (
              <Link
                key={s.title}
                href={`/services#${s.anchor}`}
                className="flex flex-col bg-white border border-border rounded-2xl py-7 px-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_-20px_rgba(22,19,15,0.4)] hover:border-[#E0D2BC]"
              >
                <div className="flex items-center justify-between mb-[18px]">
                  <div className="w-[54px] h-[54px] rounded-xl bg-[rgba(232,119,34,0.1)] text-orange flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="font-heading font-bold text-[15px] text-[#C9BCA6]">
                    &rarr;
                  </span>
                </div>
                <h3 className="font-heading font-bold text-[22px] tracking-wide uppercase text-dark mb-[9px] leading-tight">
                  {s.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-text-tertiary">
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white border-t border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(54px,7vw,96px)]">
          <div className="flex flex-wrap items-end justify-between gap-[18px] mb-[clamp(32px,4vw,48px)]">
            <div className="max-w-[560px]">
              <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-3.5">
                What Homeowners Say
              </div>
              <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.2rem)] leading-none tracking-tight uppercase text-dark">
                Trusted across Connecticut
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-cream border border-border rounded-xl py-3 px-[18px]">
              <div className="flex gap-0.5 text-orange text-[19px] tracking-wider">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <div className="leading-tight">
                <div className="font-heading font-bold text-[17px] text-dark">
                  5.0 Rating
                </div>
                <div className="text-[12.5px] text-text-light">
                  on Google &middot; reviews placeholder
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="m-0 bg-cream border border-border rounded-2xl py-[30px] px-7 flex flex-col"
              >
                <div className="text-orange text-[18px] tracking-wider mb-4">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <blockquote className="m-0 mb-[22px] text-[16.5px] leading-relaxed text-[#3C352C]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-[13px]">
                  <div className="w-11 h-11 rounded-full bg-dark text-orange flex items-center justify-center font-heading font-extrabold text-[17px]">
                    &#10077;
                  </div>
                  <div className="leading-tight">
                    <div className="font-heading font-bold text-[17px] text-dark">
                      {r.name}
                    </div>
                    <div className="text-[13px] text-text-light">{r.town}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(232,119,34,0.05),rgba(232,119,34,0.05)_26px,transparent_26px,transparent_52px)]" />
        <div className="relative max-w-[1100px] mx-auto px-7 py-[clamp(56px,7vw,100px)] text-center">
          <div className="font-heading font-bold text-[15px] tracking-[2.6px] uppercase text-orange mb-4">
            Free Estimates &middot; No Pressure
          </div>
          <h2 className="font-heading font-extrabold text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[0.95] tracking-tight uppercase text-white max-w-[760px] mx-auto mb-5">
            Got a project in mind? Let&rsquo;s talk.
          </h2>
          <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] text-text-footer-light max-w-[560px] mx-auto mb-[34px]">
            Tell us what you&rsquo;re thinking and get an honest estimate
            &mdash; usually within a day or two. No deposit, no obligation.
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
              className="font-heading font-bold text-[19px] tracking-wider uppercase bg-transparent text-white py-4 px-9 rounded-[9px] border-[1.5px] border-[rgba(255,255,255,0.3)] inline-flex items-center gap-2.5 hover:border-orange hover:text-orange transition-all"
            >
              <span>&#9742;</span> (860) 488-1427
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
