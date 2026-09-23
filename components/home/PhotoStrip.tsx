import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";

const photos = [
  { src: "/img/photos/rehal-window.webp", alt: "A Quran on a wooden rehal in soft window light" },
  { src: "/img/photos/calligraphy-writing.webp", alt: "A calligrapher writing Arabic letters with a reed pen" },
  { src: "/img/photos/mosque-library.webp", alt: "Bookshelves beneath a chandelier in a mosque" },
  { src: "/img/photos/quran-roses.webp", alt: "An open Quran surrounded by white roses" },
  { src: "/img/photos/reader-arch.webp", alt: "A reader sitting beneath a stone arch" },
  { src: "/img/photos/prayer-beads-book.webp", alt: "Hands holding prayer beads over an open book" },
  { src: "/img/photos/lantern-bokeh.webp", alt: "A small lantern glowing in the dark" },
  { src: "/img/photos/quran-stand-dates.webp", alt: "A Quran on a carved stand beside dates" },
];

/** A slow-gliding gallery of calm, study-related photographs. */
export function PhotoStrip() {
  return (
    <section aria-label="Moments of learning" className="relative pt-8">
      <Marquee duration={60} gap={1.25}>
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className={`relative shrink-0 overflow-hidden rounded-[1.75rem] shadow-soft ${
              i % 2 ? "h-64 w-48 sm:h-80 sm:w-60" : "h-56 w-72 sm:h-72 sm:w-96"
            }`}
          >
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 640px) 24rem, 18rem" className="object-cover" />
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
