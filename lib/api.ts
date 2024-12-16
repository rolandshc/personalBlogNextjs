import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { POSTS_PATH } from '../utils/mdxUtils';
import { PostType } from '../types/post';

export type PostItems = {
  slug?: string;
  date?: string;
  content?: string;
  [key: string]: string | undefined;
};

const validFields = new Set(['slug', 'content', 'date', 'title', 'tag', 'description']);

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH);
}

export function getPostBySlug(slug: string, fields: string[] = []): PostItems {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: PostItems = {};

  // Ensure only the requested fields are exposed
  fields.forEach((field) => {
    if (!validFields.has(field)) {
      throw new Error(`Invalid field: ${field}`);
    }
    if (field === 'slug') {
      items[field] = realSlug;
    } else if (field === 'content') {
      items[field] = content;
    } else {
      items[field] = data[field] || '';
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []): PostType[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug, fields);
      return {
        slug: post.slug || "",
        date: post.date || "",
        title: post.title || "",
        description: post.description || "",
        tag: post.tag || "",
      } as PostType;
    })
    .sort(
      (post1, post2) =>
        new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );
  return posts;
}

export function getLatestPosts(postNum: number, fields: string[] = []): PostItems[] {
  return getAllPosts(fields).slice(0, postNum);
}
