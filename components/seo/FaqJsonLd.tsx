import { JsonLd } from "./JsonLd";

/** FAQPage structured data, so questions can appear as rich results in Google. */
export function FaqJsonLd({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}
