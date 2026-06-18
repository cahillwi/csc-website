"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-dark text-[#E9E1D4] text-[13.5px] tracking-wide">
        <div className="max-w-[1200px] mx-auto px-7 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5.5">
            <a
              href="tel:+18604881427"
              className="flex items-center gap-[7px] font-semibold text-white"
            >
              <span className="text-orange">&#9742;</span> (860) 488-1427
            </a>
            <span className="flex items-center gap-[7px] text-utility-text">
              <span className="text-orange">&#9678;</span> Serving Connecticut
              &amp; surrounding towns
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-utility-text">
            <span className="font-heading font-semibold tracking-wider uppercase">
              Licensed &amp; Insured
            </span>
            <span className="text-[#3a342c]">|</span>
            <span className="font-heading font-semibold tracking-wider text-orange">
              HIC.0703549
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-60 bg-[rgba(250,246,239,0.92)] backdrop-blur-[10px] border-b border-border-header">
        <div className="max-w-[1200px] mx-auto px-7 py-[13px] flex items-center justify-between gap-[18px]">
          <Link href="/" className="flex items-center gap-[13px]">
            <span className="flex items-center bg-dark rounded-[11px] p-2 px-3.5">
              <Image
                src="/images/csc_logo.png"
                alt="Creative Space Construction LLC"
                width={152}
                height={38}
                className="h-[38px] w-auto"
                style={{ width: 'auto' }}
                priority
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-[30px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-heading font-semibold text-[17px] tracking-wider uppercase py-1.5 border-b-2 transition-colors ${
                    isActive
                      ? "text-orange border-orange font-bold"
                      : "text-nav-text border-transparent hover:text-orange hover:border-orange"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="font-heading font-bold text-[16px] tracking-wider uppercase bg-orange text-white py-[11px] px-[22px] rounded-lg shadow-[0_6px_16px_rgba(232,119,34,0.32)] hover:bg-orange-dark hover:shadow-[0_8px_20px_rgba(232,119,34,0.42)] transition-all"
            >
              Get a Free Estimate
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="flex lg:hidden flex-col justify-center gap-[5px] w-[46px] h-[46px] border border-border-card bg-white rounded-[10px] cursor-pointer items-center"
          >
            <span className="w-5 h-[2.5px] bg-dark rounded-sm" />
            <span className="w-5 h-[2.5px] bg-dark rounded-sm" />
            <span className="w-5 h-[2.5px] bg-dark rounded-sm" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-border-header bg-cream px-7 py-3.5 pb-5.5 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-heading font-semibold text-[20px] tracking-wider uppercase py-[11px] border-b border-border ${
                      isActive ? "text-orange font-bold" : "text-nav-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center mt-4 font-heading font-bold text-[18px] tracking-wider uppercase bg-orange text-white py-3.5 rounded-lg"
            >
              Get a Free Estimate
            </Link>
            <a
              href="tel:+18604881427"
              onClick={() => setMenuOpen(false)}
              className="block text-center mt-2.5 font-heading font-bold text-[18px] tracking-wider uppercase bg-transparent text-dark py-[13px] rounded-lg border-[1.5px] border-dark"
            >
              Call (860) 488-1427
            </a>
          </div>
        )}
      </header>
    </>
  );
}
