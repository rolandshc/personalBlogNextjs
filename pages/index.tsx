import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/api";
import { PostType } from "../types/post";

type IndexProps = {
  recentPosts: PostType[];
};

export const Index = ({ recentPosts }: IndexProps): JSX.Element => {
  return (
    <Layout>
      {/* Intro section */}
      <p className="py-5 sm:py-10 md:py-15 lg:py-20 xl:py-25 select-none">
        Ciao! I'm Roland, a software developer, tester, immersive experience
        creator, and a cat slave 🐈.
        <br />
        My journey in tech has taken me from Hong Kong to Israel and Estonia.
      </p>
      {/* Recent articles section */}
      <h2 className="text-2xl font-semibold mb-4 select-none">
        Recent Articles
      </h2>
      <div className="recent-articles">
        {recentPosts.map((post) => (
          <article key={post.slug} className="select-none">
            <div className="flex items-top justify-between mb-1">
              <h3 className="text-md">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-gray-900 dark:text-white dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-md text-gray-500 dark:text-gray-400 font-mono">
                {format(parseISO(post.date), "yyyy-MM-dd")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch all posts and sort them by date to get the most recent ones
  const allPosts = getAllPosts(["date", "description", "slug", "title", "tag"]);

  // Sort posts by date descending to show the most recent first
  const recentPosts = allPosts.sort(
    (a: PostType, b: PostType) =>
      parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );

  // Limit the number of recent posts to display
  const maxRecentPosts = 5;
  const displayedPosts = recentPosts.slice(0, maxRecentPosts);

  return {
    props: { recentPosts: displayedPosts },
  };
};

export default Index;
