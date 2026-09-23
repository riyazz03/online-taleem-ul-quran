import { site } from "@/lib/site";
import { JsonLd, absoluteUrl, schemaIds, type JsonLdData } from "./JsonLd";

export { JsonLd, absoluteUrl, schemaIds, siteOrigin, type JsonLdData } from "./JsonLd";

/**
 * Site-wide structured data: the academy as an EducationalOrganization and
 * the WebSite it publishes. Rendered once from the root layout.
 */
export function SiteJsonLd() {
  const { lines } = site.address;
  // Only profiles that have actually been filled in lib/site.ts.
  const socials: Record<string, string> = site.socials;
  const sameAs = Object.values(socials).filter((url) => url.trim().length > 0);

  const organization: JsonLdData = {
    "@type": "EducationalOrganization",
    "@id": schemaIds.organization,
    name: site.name,
    alternateName: site.shortName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    email: site.email,
    telephone: site.phones.map((p) => p.tel),
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      email: site.email,
      contactType: "customer support",
    })),
    address: {
      "@type": "PostalAddress",
      // Every line except the last ("Vellore – 632001"), which maps to locality + postcode.
      streetAddress: lines.slice(0, -1).join(", "),
      addressLocality: "Vellore",
      addressRegion: "Tamil Nadu",
      postalCode: "632001",
      addressCountry: "IN",
    },
    hasMap: site.address.mapsUrl,
    ...(sameAs.length > 0 && { sameAs }),
  };

  const website: JsonLdData = {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: absoluteUrl("/"),
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": schemaIds.organization },
  };

  return <JsonLd id="site-jsonld" data={{ "@context": "https://schema.org", "@graph": [organization, website] }} />;
}
