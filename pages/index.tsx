import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { PostType } from "../types/post";
import { useState } from "react";
import { useRouter } from 'next/router'

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  const router = useRouter();
  let routeData
  if(typeof(router.query.tag) !== 'undefined')
  {
    routeData = router.query.tag as string
  }
  else{
    routeData = "latest"
  }

  const [tag, setTag] = useState<string>(routeData);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    setTag(id);
  };

  let renderPosts = posts;
  let renderPostsNum;
  let tagMap = posts.map((post) => post.tag);
  let tagArr = [];

  for (let i = 0; i < tagMap.length; i++) {
    const tag = tagMap[i];

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
    }
  }

  let tagSet = new Set(tagArr);
  tagArr = Array.from(tagSet);

  return (
    <Layout>
      <h1>Roland Shum</h1>
      <p>Welcome to my personal site. Built with NextJs.</p>
      <a
        href="https://github.com/rolandshc/personalBlogNextjs"
        className="inline-block px-4 py-2 rounded-md text-white dark:text-white bg-gray-600 hover:bg-gray-700 hover:text-white dark:hover:text-white"
      >
        source code
      </a>
      <br />

      <h2 className="pt-8">My Blog Posts</h2>
      <br />
      <div>
        <a>
          <button className="mb-2 pr-3" id="All" onClick={handleClick}>
            All
          </button>
        </a>
        {(() => {
          return tagArr.map((tagId) => (
            <a key={tagId} >
              <button className="mb-2 pr-3"id={tagId} onClick={handleClick}>
                {tagId}
              </button>
            </a>
          ));
        })()}
      </div>

      {(() => {
        if (tag === "latest") {
          renderPostsNum = 2;
        } else if (tag !== "All") {
          renderPosts = renderPosts.filter((post1) => post1.tag.includes(tag));
          renderPostsNum = 10;
        } else {
          renderPostsNum = 100;
        }
        return renderPosts
          .map((post) => (
            <article key={post.slug} className="mt-12">
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  {format(parseISO(post.date), 'MMMM dd, yyyy')}
                </p>
              <h1 className="mb-1 text-xl">
                <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                  <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                    {post.title}
                  </a>
                </Link>
              </h1>
              <p className="mb-1 text-gray-300 dark:text-gray-600 text-xs">
                {post.tag}
              </p>
              <p className="mb-3 text-sm">{post.description}</p>
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

export default Index;
