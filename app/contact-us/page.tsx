import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { GeometricPattern } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FaqList } from "@/components/sections/Faq";
import { Reveal } from "@/components/motion/Reveal";
import { ContactDetails, ContactIllustration } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Book a free demo class",
  description:
    "Book a free demo Quran class or get in touch with Online Taleem ul Quran on WhatsApp or email. Choose Quran Recitation, Simplified Tajweed or Quran Memorization — demo classes are held on weekends.",
  alternates: { canonical: "/contact-us" },
};

/** The FAQ entries most relevant to someone about to book. */
const contactFaqQuestions = [
  "How can I book a free demo class?",
  "How do online Quran classes work?",
  "How do you assign teachers to students?",
  "Do I need any prior knowledge of Arabic to join?",
];
const contactFaqs = contactFaqQuestions.flatMap((q) => faqs.filter((f) => f.question === q));

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Contact & *join together*"
        description="Book a free demo class, or simply say salaam. Reach us on WhatsApp or email, or fill in the form below — our team will get back to you, in shaa Allah."
        actions={
          <>
            <ButtonLink href="#book" size="lg">
              Book a free demo
            </ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="outline" size="lg">
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </span>
            </ButtonLink>
          </>
        }
      />

      {/* Booking form + contact details. The form comes first in the DOM (and on
          mobile); on large screens it moves to the right-hand column. */}
      <section id="book" className="relative z-10 -mt-6 scroll-mt-24 pb-24 sm:-mt-10 sm:pb-32">
        <div className="container-page grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <Reveal y={50} className="lg:col-start-2 lg:row-start-1 lg:self-start">
            <ContactForm />
          </Reveal>
          <ContactDetails className="lg:col-start-1 lg:row-start-1" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-sand/80 via-sand/40 to-cream pb-12 pt-24 sm:pb-16 sm:pt-32">
        <GeometricPattern
          id="contact-faq-geo"
          className="text-brand-800 opacity-[0.045] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        />
        <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Before you *book*"
              description="Quick answers about our classes and your free demo."
            />
            <ContactIllustration className="w-full max-w-md" />
          </div>
          <FaqList items={contactFaqs} />
        </div>
      </section>
    </>
  );
}
