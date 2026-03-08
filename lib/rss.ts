import { getAllPosts } from "./api";
import { WEBSITE_HOST_URL } from "../components/Head";

export function generateRssFeed(): string {
  const posts = getAllPosts(["date", "description", "slug", "title", "tag"]);

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${WEBSITE_HOST_URL}/posts/${post.slug}</link>
      <guid>${WEBSITE_HOST_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Roland Shum</title>
    <link>${WEBSITE_HOST_URL}</link>
    <description>Personal blog by Roland Shum - software development, tech, and thoughts.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${WEBSITE_HOST_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

export function generateSitemap(): string {
  const posts = getAllPosts(["date", "slug"]);

  const staticPages = [
    { url: "/", priority: "1.00" },
    { url: "/about", priority: "0.80" },
    { url: "/blog", priority: "0.80" },
  ];

  const urls = [
    ...staticPages.map(
      (page) => `  <url>
    <loc>${WEBSITE_HOST_URL}${page.url}</loc>
    <priority>${page.priority}</priority>
  </url>`
    ),
    ...posts.map(
      (post) => `  <url>
    <loc>${WEBSITE_HOST_URL}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <priority>0.64</priority>
  </url>`
    ),
  ].join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
