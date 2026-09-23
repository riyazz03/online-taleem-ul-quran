import { siteUrl } from "@/lib/site";

/** Any schema.org object (or @graph wrapper). */
export type JsonLdData = { [key: string]: unknown };

/** The site origin without a trailing slash, e.g. "https://example.com". */
export const siteOrigin = siteUrl.replace(/\/+$/, "");

/** Turns a site-relative path ("/about-us") into an absolute URL for structured data. */
export function absoluteUrl(path = "/") {
  return new URL(path, `${siteOrigin}/`).toString();
}

/** Stable `@id`s so page-level JSON-LD can reference the site-wide nodes. */
export const schemaIds = {
  organization: `${siteOrigin}/#organization`,
  website: `${siteOrigin}/#website`,
};

/**
 * Renders a `<script type="application/ld+json">` tag. Use it from any server
 * component, e.g. `<JsonLd data={{ "@context": "https://schema.org", "@type": "Course", ... }} />`.
 * `<` is escaped so content can never close the script tag early.
 */
export function JsonLd({ data, id }: { data: JsonLdData | JsonLdData[]; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
