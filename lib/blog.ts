/**
 * Blog content: Markdown files with frontmatter in `content/blog/*.md`,
 * parsed with gray-matter and rendered to HTML with marked at build time.
 *
 * Server-only (uses the file system). Client components may import the
 * types with `import type`.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;
const COVER_TONES = 4;

export type TocItem = { id: string; text: string; number: string };

export type PostMeta = {
  slug: string;
  title: string;
  /** Title with *emphasis* markers, used for the big display headings. */
  display: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Human readable date, e.g. "20 September 2026". */
  dateLabel: string;
  category: string;
  author: string;
  /** Short Arabic word used as generative cover art. */
  arabic: string;
  /** Accessible description of the cover art (frontmatter `coverAlt`). */
  coverAlt: string;
  featured: boolean;
  readingTime: number;
  wordCount: number;
  /** Colour variant of the generative cover (stable per post). */
  tone: number;
};

export type FaqItem = { question: string; answer: string };

export type Post = PostMeta & {
  html: string;
  toc: TocItem[];
  /** Q&As from the post's "## Frequently asked questions" section (### questions), as plain text. */
  faqs: FaqItem[];
};

/* ------------------------------------------------------------------
   Markdown rendering
------------------------------------------------------------------- */

const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
const LATIN = /[A-Za-z]/;

/** A paragraph written entirely in Arabic script. */
function isArabicBlock(text: string) {
  return ARABIC.test(text) && !LATIN.test(text);
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&[a-z]+;|&#\d+;/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s-]+/g, "-") || "section"
  );
}

// Class names live here as literals so Tailwind picks them up.
const ARABIC_PARAGRAPH =
  "font-arabic not-italic text-right text-[1.7rem] leading-[2.1] text-brand-800 sm:text-[2rem]";
const H2_NUMBER =
  "mb-4 flex items-center gap-3 font-sans text-xs font-bold uppercase not-italic tracking-[0.3em] text-gold-500";
const QUOTE_BADGE =
  "absolute -top-4 left-7 grid size-8 place-items-center rounded-full bg-gold-300 text-brand-950 shadow-soft sm:left-10";
const STAR_PATH =
  "M12 0l3.5 3.5H20.5V8.5L24 12l-3.5 3.5v5h-5L12 24l-3.5-3.5h-5v-5L0 12l3.5-3.5v-5h5z";

function renderMarkdown(markdown: string) {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const uniqueId = (text: string) => {
    const base = slugify(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };

  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const text = this.parser.parseInline(tokens, this.parser.textRenderer).trim();
        const id = uniqueId(text);
        if (depth === 2) {
          const number = String(toc.length + 1).padStart(2, "0");
          toc.push({ id, text, number });
          return `<h2 id="${id}"><span aria-hidden="true" class="${H2_NUMBER}">${number}<span class="h-px w-10 bg-gold-400/50"></span></span>${html}</h2>\n`;
        }
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      paragraph({ tokens, text }) {
        if (!isArabicBlock(text)) return false;
        return `<p lang="ar" dir="rtl" class="${ARABIC_PARAGRAPH}">${this.parser.parseInline(tokens)}</p>\n`;
      },
      blockquote({ tokens }) {
        const badge = `<span aria-hidden="true" class="${QUOTE_BADGE}"><svg viewBox="0 0 24 24" class="size-3.5" fill="currentColor"><path d="${STAR_PATH}"/></svg></span>`;
        return `<blockquote>${badge}${this.parser.parse(tokens)}</blockquote>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
        const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${escapeAttr(href)}"${titleAttr}${target}>${text}</a>`;
      },
    },
  });

  const html = marked.parse(markdown, { async: false });
  return { html, toc };
}

/* ------------------------------------------------------------------
   FAQ extraction (for FAQPage structured data)
------------------------------------------------------------------- */

/** An H2 that opens a post's FAQ block, e.g. "Frequently asked questions about Tajweed". */
const FAQ_HEADING = /^(frequently asked questions|faqs?)\b/i;

/** Inline Markdown → plain text: drops tags, link targets and emphasis markers. */
function toPlainText(markdown: string) {
  return markdown
    .replace(/<[^>]+>/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Collects the `### question` + answer pairs under the post's FAQ heading.
 * The section ends at the next H2 (or the end of the post).
 */
function extractFaqs(markdown: string): FaqItem[] {
  const items: { question: string; parts: string[] }[] = [];
  let inFaq = false;

  for (const token of new Marked().lexer(markdown)) {
    if (token.type === "heading") {
      const text = toPlainText(String(token.text));
      if (token.depth <= 2) inFaq = token.depth === 2 && FAQ_HEADING.test(text);
      else if (inFaq && token.depth === 3) items.push({ question: text, parts: [] });
      continue;
    }
    const current = inFaq ? items[items.length - 1] : undefined;
    if (!current) continue;
    if (token.type === "paragraph") {
      current.parts.push(toPlainText(token.text));
    } else if (token.type === "list") {
      for (const item of token.items as Tokens.ListItem[]) current.parts.push(toPlainText(item.text));
    }
  }

  return items
    .filter((item) => item.parts.length > 0)
    .map((item) => ({ question: item.question, answer: item.parts.join(" ") }));
}

/* ------------------------------------------------------------------
   Loading posts
------------------------------------------------------------------- */

function countWords(markdown: string) {
  const text = markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ");
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(isoDate: string) {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

function toIsoDate(value: unknown, file: string) {
  const date = value instanceof Date ? value : new Date(`${String(value)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`[blog] Invalid "date" in ${file}`);
  return date.toISOString().slice(0, 10);
}

function requireString(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`[blog] Missing frontmatter field "${key}" in ${file}`);
  }
  return value.trim();
}

let cached: Post[] | null = null;

function loadPosts(): Post[] {
  // Re-read on every call in development so edits show up immediately.
  if (cached && process.env.NODE_ENV === "production") return cached;

  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))
    : [];

  const posts = files.map((file) => {
    const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(source);
    const title = requireString(data, "title", file);
    const date = toIsoDate(data.date, file);
    const wordCount = countWords(content);
    const { html, toc } = renderMarkdown(content);
    return {
      slug: file.replace(/\.md$/, ""),
      title,
      display: typeof data.display === "string" && data.display.trim() ? data.display.trim() : title,
      excerpt: requireString(data, "excerpt", file),
      date,
      dateLabel: formatDate(date),
      category: requireString(data, "category", file),
      author: requireString(data, "author", file),
      arabic: requireString(data, "arabic", file),
      coverAlt:
        typeof data.coverAlt === "string" && data.coverAlt.trim()
          ? data.coverAlt.trim()
          : `Arabic calligraphy cover art for “${title}”`,
      featured: data.featured === true,
      readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
      wordCount,
      tone: 0,
      html,
      toc,
      faqs: extractFaqs(content),
    } satisfies Post;
  });

  // Tones are assigned oldest-first so they stay put as new posts arrive.
  [...posts]
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug))
    .forEach((p, i) => {
      p.tone = i % COVER_TONES;
    });

  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  cached = posts;
  return posts;
}

function toMeta(post: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { html, toc, faqs, ...meta } = post;
  return meta;
}

/** Every post's metadata, newest first. */
export function getAllPosts(): PostMeta[] {
  return loadPosts().map(toMeta);
}

export function getPost(slug: string): Post | undefined {
  return loadPosts().find((p) => p.slug === slug);
}

/** The most recent post marked `featured: true`, or simply the latest post. */
export function getFeaturedPost(): PostMeta | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))];
}

/** Other posts to read next: same category first, then the most recent. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPost(slug);
  const others = getAllPosts().filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}
