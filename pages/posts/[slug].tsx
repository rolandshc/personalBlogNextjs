import { format, parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
// import mdxPrism from 'mdx-prism';
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import Layout, { WEBSITE_HOST_URL } from "../../components/Layout";
import { MetaProps } from "../../types/layout";
import { PostType } from "../../types/post";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import SocialShare from "../../components/SocialShare";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  slug: String;
};


const PostPage = ({ source, frontMatter, slug }: PostPageProps): JSX.Element => {
  const postUrl = `${WEBSITE_HOST_URL}/posts/${slug}`;
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Roland Shum`,
    description: frontMatter.description,
    image: `${WEBSITE_HOST_URL}${frontMatter.image}`,
    date: frontMatter.date,
    type: "article",
    tag: frontMatter.tag,
  };

  let tagArr = [];
  let tag = frontMatter.tag;
  if (tag.includes(",")) {
    let temp = "";
    let tempTags = [];
    for (let index = 0; index < tag.length; index++) {
      if (tag[index] === ",") {
        tagArr.push(temp);
        tempTags.push(temp);
        temp = "";
      } else {
        temp += tag[index];
      }
      if (index === tag.length - 1) {
        tagArr.push(temp);
        tempTags.push(temp);
      }
    }
  } else {
    tagArr.push(tag);
  }

  return (
    <Layout customMeta={customMeta}>
      <article>
        <h1 className="mb-3 text-gray-900 dark:text-white">
          {frontMatter.title}
        </h1>
        <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
          <span>
          {format(parseISO(frontMatter.date), "MMMM dd, yyyy")}
          </span>
          <SocialShare shareUrl={postUrl} title={frontMatter.title} />
          Tag(s):
          {/* {frontMatter.tag} */}
          {(() => {
            return tagArr.map((tagId) => (
              <Link
                key={tagId}
                href={{ pathname: "/blog", query: { tag: tagId } }}
              >
                <span>
                  <button className="filter">{tagId} </button>
                </span>
              </Link>
            ));
          })()}
        </p>
        <div className="prose dark:prose-dark">
          <MDXRemote {...source} components={components} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const slug = params.slug;
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      // rehypePlugins: [mdxPrism, rehypeSlug, rehypeAutolinkHeadings],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
