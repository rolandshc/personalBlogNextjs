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
import Layout, { WEBSITE_HOST_URL } from "../../components/Layout";
import { MetaProps } from "../../types/layout";
import { PostType } from "../../types/post";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import SocialShare from "../../components/SocialShare";

const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  slug: string;
};

const PostPage = ({ source, frontMatter, slug }: PostPageProps): JSX.Element => {
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
        <h1 className="mb-3 text-gray-900 dark:text-white">
          {frontMatter.title}
        </h1>
        <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
          <span>{format(parseISO(frontMatter.date), "MMMM dd, yyyy")}</span>
          <SocialShare shareUrl={postUrl} title={frontMatter.title} />
          {tagArr.length > 0 && (
            <>
              Tag(s):{" "}
              {tagArr.map((tagId) => (
                <Link
                  key={tagId}
                  href={{ pathname: "/blog", query: { tag: tagId } }}
                >
                  <button
                    className="filter"
                    aria-label={`Filter by tag: ${tagId}`}
                  >
                    {tagId}
                  </button>
                </Link>
              ))}
            </>
          )}
        </p>
        <div className="prose dark:prose-dark">
          <MDXRemote {...source} components={components} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

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
