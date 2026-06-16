import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-text-footer-light">
      <div className="max-w-[1200px] mx-auto px-7 pt-[clamp(48px,6vw,72px)] pb-[30px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/csc_logo.png"
              alt="Creative Space Construction LLC"
              width={200}
              height={50}
              className="h-[50px] w-auto"
            />
          </div>
          <p className="text-[14.5px] leading-relaxed text-text-footer max-w-[280px] mb-[18px]">
            Building dreams one detail at a time. Owner-operated remodeling &amp;
            repair, proudly serving Connecticut homeowners.
          </p>
          <div className="flex gap-[11px]">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-[9px] bg-footer-card border border-footer-border flex items-center justify-center font-heading font-extrabold text-[18px] text-text-footer-light hover:bg-orange hover:text-white hover:border-orange transition-colors"
            >
              f
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-[9px] bg-footer-card border border-footer-border flex items-center justify-center text-text-footer-light hover:bg-orange hover:text-white hover:border-orange transition-colors"
            >
              <span className="w-[17px] h-[17px] border-2 border-current rounded-[5px] relative inline-block">
                <span className="absolute top-[3px] left-[3px] w-[7px] h-[7px] border-2 border-current rounded-full" />
              </span>
            </a>
            <a
              href="#"
              aria-label="Google Business Profile"
              className="w-10 h-10 rounded-[9px] bg-footer-card border border-footer-border flex items-center justify-center font-heading font-extrabold text-[18px] text-text-footer-light hover:bg-orange hover:text-white hover:border-orange transition-colors"
            >
              G
            </a>
          </div>
        </div>

        {/* Explore links */}
        <div>
          <div className="font-heading font-bold text-[15px] tracking-widest uppercase text-white mb-4">
            Explore
          </div>
          <div className="flex flex-col gap-[11px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14.5px] text-text-footer hover:text-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Get in touch */}
        <div>
          <div className="font-heading font-bold text-[15px] tracking-widest uppercase text-white mb-4">
            Get in touch
          </div>
          <div className="flex flex-col gap-[13px] text-[14.5px]">
            <a
              href="tel:+18604881427"
              className="flex items-center gap-2.5 text-text-footer-bright hover:text-orange transition-colors"
            >
              <span className="text-orange">&#9742;</span> (860) 488-1427
            </a>
            <a
              href="mailto:dan.toth@creative-space-construction.com"
              className="flex items-start gap-2.5 text-text-footer-bright hover:text-orange transition-colors break-words"
            >
              <span className="text-orange">&#9993;</span>{" "}
              dan.toth@creative-space-construction.com
            </a>
            <div className="flex items-start gap-2.5 text-text-footer">
              <span className="text-orange">&#9678;</span> Connecticut &amp;
              surrounding towns
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <div className="font-heading font-bold text-[15px] tracking-widest uppercase text-white mb-4">
            Hours
          </div>
          <div className="flex flex-col gap-2 text-[14.5px] text-text-footer">
            <div className="flex justify-between gap-3.5">
              <span>Mon &ndash; Fri</span>
              <span className="text-text-footer-bright">7am &ndash; 6pm</span>
            </div>
            <div className="flex justify-between gap-3.5">
              <span>Saturday</span>
              <span className="text-text-footer-bright">8am &ndash; 2pm</span>
            </div>
            <div className="flex justify-between gap-3.5">
              <span>Sunday</span>
              <span className="text-text-footer-bright">By appointment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#221E18]">
        <div className="max-w-[1200px] mx-auto px-7 py-5 flex flex-wrap gap-x-5 gap-y-2.5 items-center justify-between text-[13px] text-[#827966]">
          <span>
            {`© ${new Date().getFullYear()} Creative Space Construction · HIC.0703549 · Licensed & Insured`}
          </span>
          <span className="font-heading font-semibold tracking-widest uppercase text-[#6E6556]">
            Built right. Built to last.
          </span>
        </div>
      </div>
    </footer>
  );
}
