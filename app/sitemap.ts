import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { courses } from "@/lib/content";
import { siteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const absolute = (path: string) => new URL(path, siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();
  const latestPost = posts[0] ? new Date(`${posts[0].date}T00:00:00Z`) : now;

  const pages: Entry[] = [
    { url: absolute("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absolute("/our-course"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/about-us"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absolute("/contact-us"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: absolute("/blog"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
  ];

  const coursePages: Entry[] = courses.map((c) => ({
    url: absolute(`/course-details/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const postPages: Entry[] = posts.map((p) => ({
    url: absolute(`/blog/${p.slug}`),
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...coursePages, ...postPages];
}
