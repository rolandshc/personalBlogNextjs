import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { PostType } from "../types/post";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type BlogProps = {
  posts: PostType[];
};

export const Blog = ({ posts }: BlogProps): JSX.Element => {
  const router = useRouter();
  let routeData;
  if (typeof router.query.tag !== "undefined") {
    routeData = router.query.tag as string;
  } else {
    routeData = "All";
  }

  const [tag, setTag] = useState<string>(routeData);

  useEffect(() => {
    let abortController = new AbortController();
    if (document.getElementById(tag)) {
      document.getElementById(tag).className = "filter-selected";
      return () => {
        if (document.getElementById(tag)) {
          document.getElementById(tag).className = "filter";
          abortController.abort();
        }
      };
    }
  }, [tag]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (document.getElementById(tag)) {
      document.getElementById(tag).className = "filter";
    }
    let id = e.currentTarget.id;
    setTag(id);
    {
      if (document.getElementById(id)) {
        document.getElementById(id).className = "filter-selected";
      }
    }
    id = null;
  };

  let renderPosts = posts;
  let renderPostsNum = 100;
  let tagMap = posts.map((post) => post.tag);
  let tagArr = [];

  for (let i = 0; i < tagMap.length; i++) {
    const tag = tagMap[i];

    if (tag.includes(",")) {
      let temp = "";
      for (let index = 0; index < tag.length; index++) {
        if (tag[index] === ",") {
          tagArr.push(temp);
          temp = "";
        } else {
          temp += tag[index];
        }
        if (index === tag.length - 1) {
          tagArr.push(temp);
        }
      }
      temp = null;
    } else {
      tagArr.push(tag);
    }
  }

  let tagSet = new Set(tagArr);
  tagArr = Array.from(tagSet);
  tagArr.sort();

  return (
    <Layout>
      <h1 className="select-none">Blog Posts</h1>
      <br />
      <div className="py-2">
        <button className="mb-2 pr-3 filter" id="All" onClick={handleClick}>
          All
        </button>

        {(() => {
          return tagArr.map((tagId) => (
            <span key={tagId}>
              <button
                className="mb-2 pr-3 filter"
                id={tagId}
                onClick={handleClick}
              >
                {tagId}
              </button>
            </span>
          ));
        })()}
      </div>

      {(() => {
        if (tag != "All") {
          renderPosts = renderPosts.filter((post1) => post1.tag.includes(tag));
          renderPostsNum = 10;
        }
        return renderPosts
          .map((post) => (
            <article key={post.slug} className="mt-12 select-none">
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                {format(parseISO(post.date), "MMMM dd, yyyy")}
              </p>
              <h1 className="mb-1 text-xl">
                <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                  <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                    {post.title}
                  </a>
                </Link>
              </h1>
              <p className="mb-1 text-gray-700 dark:text-gray-400 text-xs">
                {post.tag}
              </p>
              <p className="mb-3 text-sm text-gray-400 dark:text-gray-500">
                {post.description}
              </p>
            </article>
          ))
          .slice(0, renderPostsNum);
      })()}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["date", "description", "slug", "title", "tag"]);

  return {
    props: { posts },
  };
};

export default Blog;
