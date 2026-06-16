"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const projectTypes = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Basement Finishing",
  "Basement Waterproofing",
  "Deck or Patio",
  "Interior Renovation",
  "Home Repair / Handyman",
  "Other",
];

const contactMethods = ["Phone Call", "Text Message", "Email"] as const;

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredContact: string;
  projectDetails: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  projectType: "",
  preferredContact: "",
  projectDetails: "",
};

async function submitToHubSpot(data: FormData): Promise<void> {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID;

  if (!portalId || !formGuid) {
    throw new Error("HubSpot configuration missing");
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const payload = {
    fields: [
      { name: "firstname", value: data.firstName },
      { name: "lastname", value: data.lastName },
      { name: "email", value: data.email },
      { name: "phone", value: data.phone },
      { name: "project_type", value: data.projectType },
      { name: "preferred_contact_method", value: data.preferredContact },
      { name: "project_details", value: data.projectDetails },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!data.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!data.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

const inputClass =
  "w-full font-body text-base text-dark bg-white border border-border-input rounded-[10px] py-[13px] px-[15px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(232,119,34,0.16)] placeholder:text-text-footer";

export default function ContactClient() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      await submitToHubSpot(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
    setStatus("idle");
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[radial-gradient(120%_150%_at_80%_0%,#FFFDF8_0%,#FAF6EF_50%,#F3EBDD_100%)] border-b border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 pt-[clamp(38px,5vw,64px)] pb-[clamp(30px,3.5vw,42px)]">
          <div className="inline-flex items-center gap-[9px] bg-white border border-border-header rounded-full py-[7px] px-[15px] mb-5 animate-csc-fade">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="font-heading font-semibold text-[13.5px] tracking-[2px] uppercase text-text-muted">
              Free Estimates &middot; No Pressure
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92] tracking-tight uppercase text-dark mb-4">
            Let&rsquo;s talk about
            <br />
            <span className="text-orange">your project</span>
          </h1>
          <p className="text-[clamp(1.05rem,1.6vw,1.28rem)] text-text-secondary max-w-[600px] [text-wrap:pretty]">
            Tell us a little about what you have in mind and we&rsquo;ll get
            back to you &mdash; usually within a day or two &mdash; with an
            honest estimate. No deposit, no obligation.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section id="lead-form" className="bg-cream scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-7 pt-[clamp(34px,4.5vw,60px)] pb-[clamp(48px,6vw,80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[clamp(24px,4vw,46px)] items-start">
            {/* Form Card */}
            <div className="bg-white border border-border rounded-[18px] p-[clamp(24px,3.5vw,40px)] shadow-[0_20px_44px_-30px_rgba(22,19,15,0.4)]">
              {status === "success" ? (
                <SuccessState onReset={reset} />
              ) : (
                <div>
                  <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.3rem)] leading-none tracking-tight uppercase text-dark mb-2">
                    Request your free estimate
                  </h2>
                  <p className="text-[15px] text-text-muted mb-[26px]">
                    Fields marked{" "}
                    <span className="text-orange">*</span> are required.
                    We&rsquo;ll only use this to follow up about your project.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px_20px]">
                      <FieldWrapper label="First name" required error={errors.firstName}>
                        <input
                          type="text"
                          className={inputClass}
                          value={form.firstName}
                          onChange={(e) => setField("firstName", e.target.value)}
                          placeholder="First name"
                          autoComplete="given-name"
                        />
                      </FieldWrapper>
                      <FieldWrapper label="Last name" required error={errors.lastName}>
                        <input
                          type="text"
                          className={inputClass}
                          value={form.lastName}
                          onChange={(e) => setField("lastName", e.target.value)}
                          placeholder="Last name"
                          autoComplete="family-name"
                        />
                      </FieldWrapper>
                      <FieldWrapper label="Email" required error={errors.email}>
                        <input
                          type="email"
                          className={inputClass}
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          placeholder="you@email.com"
                          autoComplete="email"
                        />
                      </FieldWrapper>
                      <FieldWrapper label="Phone" required error={errors.phone}>
                        <input
                          type="tel"
                          className={inputClass}
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="(860) 555-0123"
                          autoComplete="tel"
                        />
                      </FieldWrapper>
                    </div>

                    <div className="mt-[18px]">
                      <FieldWrapper label="Project type">
                        <select
                          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236A6052%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[position:right_14px_center] pr-10 cursor-pointer`}
                          value={form.projectType}
                          onChange={(e) => setField("projectType", e.target.value)}
                        >
                          <option value="">Select a project type&hellip;</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </FieldWrapper>
                    </div>

                    <div className="mt-[18px]">
                      <FieldWrapper label="Tell us about the project">
                        <textarea
                          className={`${inputClass} min-h-[130px] resize-y leading-relaxed`}
                          value={form.projectDetails}
                          onChange={(e) => setField("projectDetails", e.target.value)}
                          placeholder="What are you thinking? Rough timeline, must-haves, anything we should know&hellip;"
                        />
                      </FieldWrapper>
                    </div>

                    <div className="mt-5">
                      <label className="block font-heading font-semibold text-[13px] tracking-[1.2px] uppercase text-text-muted mb-2.5">
                        Preferred contact method
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {contactMethods.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setField("preferredContact", m)}
                            className={`font-heading font-semibold text-[15px] tracking-wider uppercase py-[11px] px-[18px] rounded-[10px] cursor-pointer transition-all ${
                              form.preferredContact === m
                                ? "bg-dark border border-dark text-white"
                                : "bg-white border border-border-input text-[#3C352C] hover:border-[#C9BCA6]"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {status === "error" && (
                      <div className="mt-5 p-4 bg-[rgba(192,73,43,0.08)] border border-[rgba(192,73,43,0.3)] rounded-xl text-sm text-error">
                        Something went wrong. Please try again, or reach us
                        directly at{" "}
                        <a
                          href="tel:+18604881427"
                          className="font-semibold underline"
                        >
                          (860) 488-1427
                        </a>{" "}
                        or{" "}
                        <a
                          href="mailto:dan.toth@creative-space-construction.com"
                          className="font-semibold underline"
                        >
                          dan.toth@creative-space-construction.com
                        </a>
                        .
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="mt-[26px] w-full font-heading font-bold text-[19px] tracking-wider uppercase bg-orange text-white border-none py-4 rounded-[11px] cursor-pointer shadow-[0_10px_26px_rgba(232,119,34,0.34)] hover:bg-orange-dark hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === "submitting"
                        ? "Sending…"
                        : "Send my request →"}
                    </button>
                    <p className="text-[12.5px] text-text-light text-center mt-3.5">
                      We respect your privacy. Your details go straight to us
                      &mdash; never shared or sold.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Right: Contact Info */}
            <div className="flex flex-col gap-3.5">
              <div className="font-heading font-bold text-sm tracking-[2.2px] uppercase text-orange mb-0.5">
                Or reach us directly
              </div>

              <a
                href="tel:+18604881427"
                className="flex items-center gap-[15px] bg-dark rounded-[14px] p-[20px_22px] hover:bg-[#211D18] transition-colors"
              >
                <div className="w-[46px] h-[46px] rounded-[11px] bg-[rgba(232,119,34,0.16)] flex items-center justify-center shrink-0 text-orange text-[22px]">
                  &#9742;
                </div>
                <div className="leading-tight">
                  <div className="font-heading font-semibold text-xs tracking-[1.4px] uppercase text-[#9C9282]">
                    Call or text
                  </div>
                  <div className="font-heading font-extrabold text-[22px] text-white tracking-wide">
                    (860) 488-1427
                  </div>
                </div>
              </a>

              <a
                href="mailto:dan.toth@creative-space-construction.com"
                className="flex items-center gap-[15px] bg-white border border-border rounded-[14px] p-[20px_22px] hover:border-[#E0D2BC] transition-colors"
              >
                <div className="w-[46px] h-[46px] rounded-[11px] bg-[rgba(232,119,34,0.1)] flex items-center justify-center shrink-0 text-orange text-xl">
                  &#9993;
                </div>
                <div className="leading-snug min-w-0">
                  <div className="font-heading font-semibold text-xs tracking-[1.4px] uppercase text-text-light">
                    Email us
                  </div>
                  <div className="font-semibold text-[15.5px] text-dark break-words">
                    dan.toth@creative-space-construction.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-[15px] bg-white border border-border rounded-[14px] p-[20px_22px]">
                <div className="w-[46px] h-[46px] rounded-[11px] bg-[rgba(232,119,34,0.1)] flex items-center justify-center shrink-0 text-orange text-xl">
                  &#9678;
                </div>
                <div className="leading-snug">
                  <div className="font-heading font-semibold text-xs tracking-[1.4px] uppercase text-text-light">
                    Service area
                  </div>
                  <div className="font-semibold text-[15.5px] text-dark">
                    Central Connecticut &amp; surrounding towns
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border rounded-[14px] p-[22px]">
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="text-orange text-[18px]">&#9719;</span>
                  <span className="font-heading font-bold text-[15px] tracking-[1.4px] uppercase text-dark">
                    Business hours
                  </span>
                </div>
                <div className="flex flex-col gap-[9px] text-[15px]">
                  <div className="flex justify-between gap-3.5 text-text-muted">
                    <span>Monday &ndash; Friday</span>
                    <span className="text-dark font-semibold">
                      7:00am &ndash; 6:00pm
                    </span>
                  </div>
                  <div className="flex justify-between gap-3.5 text-text-muted">
                    <span>Saturday</span>
                    <span className="text-dark font-semibold">
                      8:00am &ndash; 2:00pm
                    </span>
                  </div>
                  <div className="flex justify-between gap-3.5 text-text-muted">
                    <span>Sunday</span>
                    <span className="text-dark font-semibold">
                      By appointment
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[rgba(232,119,34,0.08)] border border-[rgba(232,119,34,0.28)] rounded-xl py-3.5 px-[18px]">
                <span className="text-orange text-[17px]">&#9889;</span>
                <span className="text-[14.5px] text-[#7A4A1F] font-semibold">
                  Most estimates returned within 1&ndash;2 business days.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white border-t border-border-light">
        <div className="max-w-[1200px] mx-auto px-7 py-[clamp(44px,5.5vw,76px)]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-[26px]">
            <div className="max-w-[560px]">
              <div className="font-heading font-bold text-sm tracking-[2.2px] uppercase text-orange mb-3">
                Where We Work
              </div>
              <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-none tracking-tight uppercase text-dark">
                Proudly serving Litchfield County &amp; beyond
              </h2>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-border-card shadow-[0_22px_44px_-30px_rgba(22,19,15,0.4)] h-[clamp(320px,42vw,470px)]">
            <iframe
              title="Creative Space Construction service area — Litchfield County, Connecticut"
              src="https://www.google.com/maps?q=Litchfield%20County,%20Connecticut&z=10&output=embed"
              className="border-0 w-full h-full block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FieldWrapper({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-heading font-semibold text-[13px] tracking-[1.2px] uppercase text-text-muted mb-[7px]">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      {children}
      {error && (
        <div className="text-[13px] text-error mt-1.5">{error}</div>
      )}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-[clamp(16px,3vw,40px)] px-1 animate-csc-fade">
      <div className="w-[74px] h-[74px] rounded-full bg-[rgba(31,138,91,0.12)] border border-[rgba(31,138,91,0.4)] flex items-center justify-center mx-auto mb-[22px]">
        <span className="text-success text-[38px] leading-none">&#10003;</span>
      </div>
      <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.4vw,2.5rem)] leading-none tracking-tight uppercase text-dark mb-3">
        Thanks &mdash; your request is in
      </h2>
      <p className="text-[16.5px] leading-relaxed text-text-secondary max-w-[420px] mx-auto mb-[26px] [text-wrap:pretty]">
        We&rsquo;ll review the details and get back to you, usually within a
        day or two. If it&rsquo;s urgent, give us a call &mdash; we&rsquo;re
        happy to talk it through.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="tel:+18604881427"
          className="font-heading font-bold text-[17px] tracking-wider uppercase bg-dark text-white py-3.5 px-[26px] rounded-[9px] inline-flex items-center gap-[9px]"
        >
          <span className="text-orange">&#9742;</span> (860) 488-1427
        </a>
        <button
          type="button"
          onClick={onReset}
          className="font-heading font-bold text-[17px] tracking-wider uppercase bg-white text-dark border-[1.5px] border-[#DCD2C2] py-3.5 px-[26px] rounded-[9px] cursor-pointer hover:border-dark transition-colors"
        >
          Send another
        </button>
      </div>
    </div>
  );
}
