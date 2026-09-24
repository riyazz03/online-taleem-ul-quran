"use client";

import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useLenis } from "lenis/react";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./contact-form.css";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CircleAlert,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";
import { courses } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8, Star8Outline } from "@/components/ui/Brand";
import { Eyebrow } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { useWeekendOptions } from "./weekends";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   Submission endpoints — identical to the original site. The lead is
   first stored in Google Sheets (Apps Script), then emailed via EmailJS.
------------------------------------------------------------------- */
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbxkr-oYcIAWfyP8yT0c9P9R7JgXJFn8GuGoHwawOuCvL6ENDssOvLtnqQjQb01RTvKu/exec";
const EMAILJS_SERVICE_ID = "service_r36maoy";
const EMAILJS_TEMPLATE_ID = "template_78iu1vr";
const EMAILJS_PUBLIC_KEY = "9GwxlluH6w4vlxKbe";

/** Course values are submitted as-is, so keep them exactly as on the original site. */
const courseOptions = (["Quran Recitation", "Simplified Tajweed", "Quran Memorization"] as const).map(
  (title) => ({ title, arabic: courses.find((c) => c.title === title)?.arabic ?? "" }),
);

type Values = { name: string; email: string; phone: string; whatsapp: string; message: string };
type FieldKey = "name" | "email" | "phone" | "whatsapp" | "course" | "date";
type Errors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "loading" | "success" | "error";
type Receipt = { name: string; course: string; date: string };

const emptyValues: Values = { name: "", email: "", phone: "", whatsapp: "", message: "" };
const defaultDial = { phone: "91", whatsapp: "91" };
const fieldOrder: FieldKey[] = ["name", "email", "phone", "whatsapp", "course", "date"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Digits typed after the country code. react-phone-input-2 values are digits only, e.g. "919087078760". */
function localDigits(value: string, dialCode: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith(dialCode) ? digits.length - dialCode.length : digits.length;
}

function phoneIsValid(value: string, dialCode: string) {
  return localDigits(value, dialCode) >= 6 && value.replace(/\D/g, "").length <= 15;
}

function validate(
  values: Values,
  dial: typeof defaultDial,
  course: string,
  date: string,
  sameAsPhone: boolean,
): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "That email address doesn’t look quite right.";
  if (!phoneIsValid(values.phone, dial.phone)) errors.phone = "Please enter a valid phone number.";
  if (!sameAsPhone && !phoneIsValid(values.whatsapp, dial.whatsapp))
    errors.whatsapp = "Please enter a valid WhatsApp number.";
  if (!course) errors.course = "Please choose a course.";
  if (!date) errors.date = "Please pick a date for your demo class.";
  return errors;
}

function whatsappBookingUrl({ name, course, date }: Receipt) {
  const lines = [
    "Assalamu alaikum! I would like to book a free demo class.",
    name.trim() && `Name: ${name.trim()}`,
    course && `Course: ${course}`,
    date && `Preferred date: ${date}`,
  ].filter(Boolean);
  return `https://wa.me/${site.phones[0].wa}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/* ------------------------------------------------------------------ */

export function ContactForm() {
  const uid = useId();
  const fid = (key: string) => `${uid}-${key}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const returningRef = useRef(false);
  const lenis = useLenis();
  const weekends = useWeekendOptions();

  const [values, setValues] = useState<Values>(emptyValues);
  const [dial, setDial] = useState(defaultDial);
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const loading = status === "loading";
  const whatsapp = sameAsPhone ? values.phone : values.whatsapp;
  const errors = validate(values, dial, course, date, sameAsPhone);
  const shownError = (key: FieldKey) => (touched[key] ? errors[key] : undefined);
  const completed = fieldOrder.filter((key) =>
    key === "whatsapp" && sameAsPhone ? !errors.phone : !errors[key],
  ).length;

  const setField = (key: keyof Values, value: string) => setValues((v) => ({ ...v, [key]: value }));
  const touch = (key: FieldKey) => setTouched((t) => (t[key] ? t : { ...t, [key]: true }));

  const scrollIntoView = useCallback(
    (el: HTMLElement, block: "start" | "center") => {
      const rect = el.getBoundingClientRect();
      // "start": the top edge is already comfortably on screen; "center": the whole element is.
      const visible =
        block === "start"
          ? rect.top >= 80 && rect.top <= window.innerHeight * 0.4
          : rect.top >= 96 && rect.bottom <= window.innerHeight;
      if (visible) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: block === "start" ? -112 : -window.innerHeight / 3 });
      } else {
        el.scrollIntoView({ block, behavior: "smooth" });
      }
    },
    [lenis],
  );

  /** Focuses the success heading as soon as it mounts and brings the card into view. */
  const focusOnMount = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      node.focus({ preventScroll: true });
      if (cardRef.current) scrollIntoView(cardRef.current, "start");
    },
    [scrollIntoView],
  );

  /** After "Book another demo", put the cursor back in the first field. */
  const nameInputRef = useCallback((node: HTMLInputElement | null) => {
    if (node && returningRef.current) {
      returningRef.current = false;
      node.focus({ preventScroll: true });
    }
  }, []);

  function focusField(key: FieldKey) {
    const target = document.getElementById(key === "course" || key === "date" ? fid(`${key}-0`) : fid(key));
    if (!target) return;
    target.focus({ preventScroll: true });
    scrollIntoView(target, "center");
  }

  function resetForm() {
    setValues(emptyValues);
    setDial(defaultDial);
    setCourse("");
    setDate("");
    setSameAsPhone(false);
    setTouched({});
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const invalid = fieldOrder.filter((key) => errors[key]);
    if (invalid.length > 0) {
      setTouched(Object.fromEntries(fieldOrder.map((key) => [key, true])));
      focusField(invalid[0]);
      return;
    }

    // Captured before the first await (React clears currentTarget afterwards).
    // Fields are never disabled while sending: EmailJS reads them from the DOM.
    const form = e.currentTarget;
    setStatus("loading");

    // 1) Google Sheets — same URL, encoding and keys as the original site.
    const formPayload = `Name=${encodeURIComponent(values.name)}&Email=${encodeURIComponent(
      values.email,
    )}&Phone=${encodeURIComponent(values.phone)}&WhatsApp=${encodeURIComponent(
      whatsapp,
    )}&Course=${encodeURIComponent(course)}&Message=${encodeURIComponent(
      values.message,
    )}&Date=${encodeURIComponent(date)}`;

    try {
      const res = await fetch(SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formPayload,
      });
      await res.text();
    } catch (err) {
      console.error("Google Sheets error:", err);
      setStatus("error");
      return;
    }

    // 2) EmailJS — sends the <form> itself (fields: name, email, phone, whatsapp, course, message, date).
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      return;
    }

    setReceipt({ name: values.name, course, date });
    resetForm();
    setStatus("success");
  }

  function bookAnother() {
    returningRef.current = true;
    setReceipt(null);
    setStatus("idle");
  }

  return (
    <div
      ref={cardRef}
      className="relative rounded-[2.5rem] border border-brand-900/8 bg-white shadow-lift"
    >
      {/* Decoration (clipped separately so the country list can overflow the card) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute -right-28 -top-28 size-80 rounded-full bg-brand-100/70 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-gold-100/60 blur-3xl" />
        <GeometricPattern
          id="contact-form-geo"
          className="text-brand-800 opacity-[0.06] [mask-image:radial-gradient(circle_at_100%_0%,black,transparent_42%)]"
        />
        <Star8Outline className="absolute -right-20 -top-20 size-64 animate-spin-slow text-gold-400/25" />
      </div>

      {/* Completion meter */}
      <div aria-hidden className="absolute inset-x-10 top-0 h-[3px] overflow-hidden rounded-b-full bg-brand-100 sm:inset-x-14">
        <m.span
          className="block h-full origin-left bg-gradient-to-r from-brand-400 via-gold-400 to-brand-400"
          initial={false}
          animate={{ scaleX: status === "success" ? 1 : completed / fieldOrder.length }}
          transition={{ duration: 0.8, ease }}
        />
      </div>

      <div className="relative p-5 pt-8 sm:p-10 lg:p-12">
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" && receipt ? (
            <SuccessPanel key="success" receipt={receipt} headingRef={focusOnMount} onReset={bookAnother} />
          ) : (
            <m.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="flex flex-col items-start gap-4">
                <Eyebrow>Free demo class</Eyebrow>
                <SplitHeading
                  text="Book your *free demo*"
                  className="font-display text-[2.6rem] leading-[1] tracking-[-0.02em] text-brand-950 sm:text-5xl lg:text-[3.4rem]"
                />
                <p className="max-w-lg leading-relaxed text-muted text-pretty">
                  Share a few details and pick a weekend date that suits you. Our team will get
                  back to you to confirm your class, in shaa Allah.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Book a free demo class"
                aria-busy={loading}
                className="mt-9 flex flex-col gap-8"
              >
                <Stagger
                  stagger={0.08}
                  amount={0.05}
                  className={cn(
                    "flex flex-col gap-8 transition-opacity duration-300",
                    loading && "pointer-events-none opacity-60",
                  )}
                >
                  {/* 01 — Personal details */}
                  <StaggerItem className="relative z-20">
                    <fieldset className="min-w-0">
                      <legend className="mb-4 w-full">
                        <GroupTitle index="01">Your details</GroupTitle>
                      </legend>
                      <div className="flex flex-col gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <TextField
                            id={fid("name")}
                            name="name"
                            label="Full name"
                            autoComplete="name"
                            value={values.name}
                            inputRef={nameInputRef}
                            error={shownError("name")}
                            valid={touched.name && !errors.name}
                            onChange={(v) => setField("name", v)}
                            onBlur={() => values.name.trim() && touch("name")}
                          />
                          <TextField
                            id={fid("email")}
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="email"
                            inputMode="email"
                            value={values.email}
                            error={shownError("email")}
                            valid={touched.email && !errors.email}
                            onChange={(v) => setField("email", v)}
                            onBlur={() => values.email.trim() && touch("email")}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <PhoneField
                            id={fid("phone")}
                            name="phone"
                            label="Phone number"
                            value={values.phone}
                            error={shownError("phone")}
                            onChange={(v, code) => {
                              setField("phone", v);
                              setDial((d) => ({ ...d, phone: code }));
                            }}
                            onBlur={() => localDigits(values.phone, dial.phone) > 0 && touch("phone")}
                          />
                          <PhoneField
                            id={fid("whatsapp")}
                            name="whatsapp"
                            label="WhatsApp number"
                            value={whatsapp}
                            readOnly={sameAsPhone}
                            error={sameAsPhone ? undefined : shownError("whatsapp")}
                            onChange={(v, code) => {
                              setField("whatsapp", v);
                              setDial((d) => ({ ...d, whatsapp: code }));
                            }}
                            onBlur={() => localDigits(values.whatsapp, dial.whatsapp) > 0 && touch("whatsapp")}
                          />
                        </div>

                        <label className="inline-flex w-fit cursor-pointer select-none items-center gap-3 text-sm font-medium text-brand-900">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={sameAsPhone}
                            onChange={(e) => {
                              setSameAsPhone(e.target.checked);
                              // Copy the phone number either way, so unticking leaves an editable copy.
                              setValues((v) => ({ ...v, whatsapp: v.phone }));
                              setDial((d) => ({ ...d, whatsapp: d.phone }));
                            }}
                          />
                          <span
                            aria-hidden
                            className="grid size-5 shrink-0 place-items-center rounded-md border border-brand-900/20 bg-white text-white transition-all duration-300 peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2 [&>svg]:scale-50 [&>svg]:opacity-0 [&>svg]:transition-all [&>svg]:duration-300 peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100"
                          >
                            <Check className="size-3.5" strokeWidth={3.5} />
                          </span>
                          WhatsApp number is the same as my phone
                        </label>
                      </div>
                    </fieldset>
                  </StaggerItem>

                  {/* 02 — Course */}
                  <StaggerItem>
                    <fieldset className="min-w-0" aria-describedby={shownError("course") ? fid("course-error") : undefined}>
                      <legend className="mb-4 w-full">
                        <GroupTitle index="02">
                          I&apos;m interested in <span className="sr-only">(required)</span>
                        </GroupTitle>
                      </legend>
                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {courseOptions.map((option, i) => (
                          <label key={option.title} className="relative block cursor-pointer">
                            <input
                              id={fid(`course-${i}`)}
                              type="radio"
                              name="course"
                              value={option.title}
                              required
                              checked={course === option.title}
                              onChange={() => {
                                setCourse(option.title);
                                touch("course");
                              }}
                              className="peer sr-only"
                            />
                            <span
                              className={cn(
                                "flex h-full items-center gap-4 rounded-2xl border bg-cream/50 p-3.5 pr-10 transition-all duration-300 hover:border-brand-900/25 hover:bg-white sm:flex-col sm:items-start sm:gap-3 sm:p-4",
                                "peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:shadow-[0_0_0_4px_rgb(99_174_167/0.15)] peer-checked:hover:bg-brand-50",
                                "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2",
                                shownError("course") ? "border-rose-300" : "border-brand-900/12",
                              )}
                            >
                              <span
                                lang="ar"
                                dir="rtl"
                                className="grid h-12 min-w-12 shrink-0 place-items-center rounded-xl bg-white px-2.5 font-arabic text-xl leading-none text-gold-500 shadow-soft"
                              >
                                {option.arabic}
                              </span>
                              <span className="text-[0.95rem] font-semibold leading-snug text-brand-950">
                                {option.title}
                              </span>
                            </span>
                            <span
                              aria-hidden
                              className="absolute right-3.5 top-1/2 grid size-5 -translate-y-1/2 scale-50 place-items-center rounded-full bg-brand-600 text-white opacity-0 transition-all duration-300 ease-[var(--ease-spring)] peer-checked:scale-100 peer-checked:opacity-100 sm:top-3.5 sm:translate-y-0"
                            >
                              <Check className="size-3" strokeWidth={3.5} />
                            </span>
                          </label>
                        ))}
                      </div>
                      <FieldError id={fid("course-error")} message={shownError("course")} />
                    </fieldset>
                  </StaggerItem>

                  {/* 03 — Demo date */}
                  <StaggerItem>
                    <fieldset className="min-w-0" aria-describedby={shownError("date") ? fid("date-error") : undefined}>
                      <legend className="mb-4 w-full">
                        <GroupTitle index="03">
                          Your demo class on weekends <span className="sr-only">(required)</span>
                        </GroupTitle>
                      </legend>
                      <div className="grid grid-cols-3 gap-2.5">
                        {weekends.length === 0
                          ? [0, 1, 2].map((i) => (
                              <span key={i} aria-hidden className="h-[6.25rem] animate-pulse rounded-2xl bg-brand-900/[0.05]" />
                            ))
                          : weekends.map((option, i) => (
                              <label key={option.value} className="relative block cursor-pointer">
                                <input
                                  id={fid(`date-${i}`)}
                                  type="radio"
                                  name="date"
                                  value={option.value}
                                  aria-label={option.value}
                                  required
                                  checked={date === option.value}
                                  onChange={() => {
                                    setDate(option.value);
                                    touch("date");
                                  }}
                                  className="peer sr-only"
                                />
                                <span
                                  className={cn(
                                    "flex h-[6.25rem] flex-col items-center justify-center rounded-2xl border bg-cream/50 text-brand-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-900/25 hover:bg-white",
                                    "peer-checked:-translate-y-0.5 peer-checked:border-brand-800 peer-checked:bg-brand-800 peer-checked:text-cream peer-checked:shadow-[0_16px_30px_-14px_rgb(35_76_74/0.7)] peer-checked:hover:border-brand-700 peer-checked:hover:bg-brand-700",
                                    "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2",
                                    shownError("date") ? "border-rose-300" : "border-brand-900/12",
                                  )}
                                >
                                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] opacity-70">
                                    {option.weekday}
                                  </span>
                                  <span className="mt-1 font-display text-4xl leading-none">{option.day}</span>
                                  <span className="mt-1 text-xs font-semibold opacity-70">{option.month}</span>
                                </span>
                                <Star8
                                  className="absolute right-2.5 top-2.5 size-3 scale-0 text-gold-300 opacity-0 transition-all duration-500 ease-[var(--ease-spring)] peer-checked:rotate-45 peer-checked:scale-100 peer-checked:opacity-100"
                                />
                              </label>
                            ))}
                      </div>
                      <FieldError id={fid("date-error")} message={shownError("date")} />
                    </fieldset>
                  </StaggerItem>

                  {/* Message */}
                  <StaggerItem>
                    <TextField
                      id={fid("message")}
                      name="message"
                      label="Message (optional)"
                      required={false}
                      multiline
                      value={values.message}
                      onChange={(v) => setField("message", v)}
                    />
                  </StaggerItem>
                </Stagger>

                <AnimatePresence initial={false}>
                  {status === "error" && (
                    <m.div
                      key="error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div role="alert" className="flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 sm:p-5">
                        <CircleAlert className="mt-0.5 size-5 shrink-0 text-rose-600" />
                        <div className="text-sm leading-relaxed text-rose-950/80">
                          <p className="font-semibold text-rose-950">We couldn&apos;t send your request.</p>
                          <p className="mt-1">
                            Please check your connection and try again — or send us your booking on
                            WhatsApp and we&apos;ll take it from there.
                          </p>
                          <a
                            href={whatsappBookingUrl({ name: values.name, course, date })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-brand-600"
                          >
                            <WhatsAppIcon className="size-4" />
                            Book on WhatsApp
                          </a>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-full bg-brand-800 py-2.5 pl-7 pr-2.5 text-base font-semibold tracking-tight text-cream shadow-[0_10px_30px_-10px_rgb(35_76_74/0.7)] transition-[background-color,transform] duration-300 hover:bg-brand-900 active:scale-[0.98] disabled:cursor-wait sm:justify-start",
                      "before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-translate-x-full before:skew-x-[-20deg] before:bg-white/25 before:transition-transform before:duration-700 hover:before:translate-x-[450%]",
                    )}
                  >
                    <span className="relative">{loading ? "Sending your request…" : "Book my free demo"}</span>
                    <span className="relative grid size-10 place-items-center rounded-full bg-brand-400 text-brand-950 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-45 group-disabled:rotate-0">
                      {loading ? (
                        <LoaderCircle className="size-5 animate-spin" strokeWidth={2.25} />
                      ) : (
                        <ArrowUpRight className="size-5" strokeWidth={2.25} />
                      )}
                    </span>
                  </button>
                  <p className="text-center text-sm text-muted sm:text-right">
                    Prefer WhatsApp?{" "}
                    <a
                      href={site.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition-colors hover:text-brand-900 hover:decoration-brand-600"
                    >
                      Message us
                    </a>
                  </p>
                </div>
                <p aria-live="polite" className="sr-only">
                  {loading ? "Sending your request, please wait." : ""}
                </p>
              </form>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Pieces
------------------------------------------------------------------- */

function GroupTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-brand-700">
      <span aria-hidden className="font-display text-lg normal-case italic tracking-normal text-gold-500">
        {index}
      </span>
      <span>{children}</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-brand-900/12 to-transparent" />
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <m.p
          key="error"
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden"
        >
          <span className="flex items-center gap-1.5 pl-1 pt-2 text-xs font-semibold text-rose-600">
            <CircleAlert className="size-3.5 shrink-0" />
            {message}
          </span>
        </m.p>
      )}
    </AnimatePresence>
  );
}

const fieldClasses =
  "cf-input peer block w-full rounded-2xl border bg-cream/50 px-5 text-[0.95rem] font-medium text-brand-950 outline-none transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand-900/25 focus:bg-white focus-visible:outline-none";

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  valid,
  type = "text",
  autoComplete,
  inputMode,
  multiline = false,
  required = true,
  inputRef,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  valid?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  inputMode?: "text" | "email";
  multiline?: boolean;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    required,
    onBlur,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  const stateClasses = error
    ? "border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:shadow-[0_0_0_4px_rgb(244_63_94/0.12)]"
    : "border-brand-900/12 focus:border-brand-500 focus:shadow-[0_0_0_4px_rgb(99_174_167/0.18)]";

  return (
    <div>
      <div className="cf-float">
        {multiline ? (
          <textarea
            {...shared}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            className={cn(fieldClasses, stateClasses, "min-h-32 resize-y pb-3 pt-7 leading-6")}
          />
        ) : (
          <input
            {...shared}
            ref={inputRef}
            type={type}
            autoComplete={autoComplete}
            inputMode={inputMode}
            onChange={(e) => onChange(e.target.value)}
            className={cn(fieldClasses, stateClasses, "h-16 pb-2 pr-11 pt-6 leading-6")}
          />
        )}
        <label htmlFor={id}>
          {label}
          {required && (
            <span aria-hidden className="text-gold-500">
              {" "}
              *
            </span>
          )}
        </label>
        {!multiline && (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-brand-100 text-brand-700 transition-all duration-300 ease-[var(--ease-spring)]",
              valid ? "scale-100 opacity-100" : "scale-50 opacity-0",
            )}
          >
            <Check className="size-3" strokeWidth={3.5} />
          </span>
        )}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function PhoneField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  readOnly = false,
}: {
  id: string;
  name: "phone" | "whatsapp";
  label: string;
  value: string;
  onChange: (value: string, dialCode: string) => void;
  onBlur: () => void;
  error?: string;
  readOnly?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      {/* data-lenis-prevent lets the country list scroll natively under Lenis */}
      <div data-lenis-prevent className={cn("cf-phone", error && "is-invalid", readOnly && "is-readonly")}>
        <PhoneInput
          country="in"
          value={value}
          onChange={(phone, data) => onChange(phone, "dialCode" in data ? data.dialCode : "")}
          onBlur={onBlur}
          placeholder=""
          enableSearch
          disableSearchIcon
          searchPlaceholder="Search country"
          preferredCountries={["in", "us", "ca", "gb", "sa", "ae"]}
          disableDropdown={readOnly}
          inputProps={{
            id,
            name,
            required: true,
            readOnly,
            autoComplete: "tel",
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
          }}
        />
        <label htmlFor={id} className="cf-phone-label">
          {label}
          <span aria-hidden className="text-gold-500">
            {" "}
            *
          </span>
          {readOnly && <span className="font-medium text-muted"> · same as phone</span>}
        </label>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function SuccessPanel({
  receipt,
  onReset,
  headingRef,
}: {
  receipt: Receipt;
  onReset: () => void;
  headingRef: (node: HTMLElement | null) => void;
}) {
  const firstName = receipt.name.trim().split(/\s+/)[0];
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease }}
      className="flex min-h-[32rem] flex-col items-center justify-center py-6 text-center"
    >
      <div className="relative grid size-28 place-items-center">
        <span aria-hidden className="absolute inset-4 animate-pulse-ring rounded-full bg-brand-300/60" />
        <span aria-hidden className="absolute inset-0 rounded-full bg-brand-50" />
        <svg viewBox="0 0 80 80" fill="none" aria-hidden className="relative size-24 text-brand-600">
          <circle
            className="cf-check-circle"
            cx="40"
            cy="40"
            r="34"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="3"
            transform="rotate(-90 40 40)"
          />
          <path
            className="cf-check-mark"
            d="M26 41.5 35.5 51 55 30.5"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
          return (
            <m.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.round(Math.cos(angle) * 84),
                y: Math.round(Math.sin(angle) * 84),
                scale: [0, 1, 0.5],
              }}
              transition={{ duration: 1.4, delay: 0.8, ease }}
            >
              <Star8 className={cn("size-3", i % 2 ? "text-gold-400" : "text-brand-400")} />
            </m.span>
          );
        })}
      </div>

      <Eyebrow className="mt-8">Request received</Eyebrow>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 font-display text-5xl leading-none tracking-[-0.02em] text-brand-950 focus:outline-none sm:text-6xl"
      >
        Submitted <span className="italic text-brand-500">successfully</span>
      </h2>
      <p role="status" className="mt-5 max-w-md text-lg leading-relaxed text-muted text-pretty">
        Thank you{firstName ? `, ${firstName}` : ""}! Your free demo class request has reached us.
        Our team will get in touch with you soon to confirm it, in shaa Allah.
      </p>

      <dl className="mt-7 flex flex-wrap justify-center gap-2.5">
        <div className="flex items-center gap-2 rounded-full border border-brand-900/10 bg-cream px-4 py-2 text-sm">
          <dt className="sr-only">Course</dt>
          <BookOpen aria-hidden className="size-4 text-brand-500" />
          <dd className="font-semibold text-brand-900">{receipt.course}</dd>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-brand-900/10 bg-cream px-4 py-2 text-sm">
          <dt className="sr-only">Demo date</dt>
          <CalendarDays aria-hidden className="size-4 text-brand-500" />
          <dd className="font-semibold text-brand-900">{receipt.date}</dd>
        </div>
      </dl>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="group inline-flex items-center gap-2.5 rounded-full border border-brand-900/15 bg-white/60 px-5 py-3 text-sm font-semibold text-brand-900 transition-colors duration-300 hover:border-brand-900 hover:bg-brand-900 hover:text-cream"
        >
          <RotateCcw className="size-4 transition-transform duration-500 group-hover:-rotate-180" />
          Book another demo
        </button>
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-brand-600"
        >
          <WhatsAppIcon className="size-4" />
          Chat on WhatsApp
        </a>
      </div>
    </m.div>
  );
}
