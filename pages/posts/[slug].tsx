import { format, parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import React, { JSX } from "react";
import Layout from "../../components/Layout";
import { WEBSITE_HOST_URL } from "../../components/Head";
import { MetaProps } from "../../types/layout";
import { PostType } from "../../types/post";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import SocialShare from "../../components/SocialShare";
import TableOfContents from "../../components/TableOfContents";
import CodeCopyButton from "../../components/CodeCopyButton";

const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  slug: string;
  readingTime: string;
};

const PostPage = ({ source, frontMatter, slug, readingTime }: PostPageProps): JSX.Element => {
  const postUrl = `${WEBSITE_HOST_URL}/posts/${slug}`;
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Roland Shum`,
    description: frontMatter.description || "Default description here.",
    image: frontMatter.image
      ? `${WEBSITE_HOST_URL}${frontMatter.image}`
      : `${WEBSITE_HOST_URL}/default-image.jpg`,
    date: frontMatter.date,
    type: "article",
    tag: frontMatter.tag,
  };

  const tagArr = frontMatter.tag
    ? frontMatter.tag.split(",").map((tag) => tag.trim())
    : [];

  return (
    <Layout customMeta={customMeta}>
      <article>
        {/* Post header */}
        <header className="mb-8">
          <h1 className="mb-3 text-gray-900 dark:text-white">
            {frontMatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={frontMatter.date}>
              {format(parseISO(frontMatter.date), "MMMM dd, yyyy")}
            </time>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span>{readingTime}</span>
          </div>
          {tagArr.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tagArr.map((tagId) => (
                <Link
                  key={tagId}
                  href={{ pathname: "/blog", query: { tag: tagId } }}
                  className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tagId}
                </Link>
              ))}
            </div>
          )}
        </header>

        <hr className="border-gray-200 dark:border-gray-800 mb-8" />

        <TableOfContents />

        {/* Post body */}
        <div className="prose dark:prose-dark">
          <MDXRemote {...source} components={components} />
        </div>
        <CodeCopyButton />

        {/* Post footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SocialShare shareUrl={postUrl} title={frontMatter.title} />
            <Link
              href="/blog"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const { getReadingTime } = await import("../../lib/readingTime");
  const readingTime = getReadingTime(content);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug,
      readingTime,
    },
  };
};


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
