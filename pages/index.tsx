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

const MAX_RECENT_POSTS = 5;

const Index: React.FC<IndexProps> = ({ recentPosts }) => {
  return (
    <Layout>
      {/* Intro Section */}
      <section className="py-5 sm:py-10 md:py-15 lg:py-20 xl:py-25 select-none">
        <p>
          Ciao! I'm Roland, a software developer, tester, immersive experience
          creator, and a cat slave 🐈.
          <br />
          My journey in tech has taken me from Hong Kong to Israel and Estonia.
        </p>
      </section>

      {/* Recent Articles Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 select-none">
          Recent Articles
        </h2>
        <div className="recent-articles">
          {recentPosts.map((post) => (
            <article key={post.slug} className="select-none">
              <header className="flex items-top justify-between mb-1">
                <h3 className="text-md">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-gray-900 dark:text-white dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                </h3>
                <time
                  dateTime={post.date || "1970-01-01"}
                  className="text-md text-gray-500 dark:text-gray-400 font-mono"
                >
                  {post.date ? format(parseISO(post.date), "yyyy-MM-dd") : ""}
                </time>
              </header>
            </article>
          ))}
        </div>
      </section>

      {/* Optional "View All" Link */}
      {recentPosts.length >= MAX_RECENT_POSTS && (
        <div className="text-right mt-4">
          <Link href="/blog" className="text-blue-500 hover:underline">
            View All Posts →
          </Link>
        </div>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  // Fetch all posts with necessary fields
  const allPosts = getAllPosts(["date", "description", "slug", "title", "tag"]);

  // Limit the number of recent posts to display
  const recentPosts = allPosts.slice(0, MAX_RECENT_POSTS);

  return {
    props: { recentPosts },
  };
};

export default Index;
