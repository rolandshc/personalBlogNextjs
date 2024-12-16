import { useState, useEffect, useMemo, JSX } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { PostType } from "../types/post";
import { GetStaticProps } from "next";
import Pagination from "../components/Pagination";
import clsx from "clsx";

type BlogProps = {
  posts: PostType[];
};

const Blog = ({ posts }: BlogProps): JSX.Element => {
  const router = useRouter();
  const initialTag = (router.query.tag as string) || "All";
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [tagList, setTagList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;

  useEffect(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      parseTags(post.tag).forEach((tag) => tags.add(tag));
    });
    setTagList(["All", ...Array.from(tags).sort()]);
  }, [posts]);

  const parseTags = (tags: string): string[] =>
    tags.split(",").map((tag) => tag.trim());

  const handleTagClick = (newTag: string) => {
    setSelectedTag(newTag);
    setCurrentPage(1);
  };

  const filteredPosts = useMemo(
    () =>
      selectedTag === "All"
        ? posts
        : posts.filter((post) => parseTags(post.tag).includes(selectedTag)),
    [posts, selectedTag]
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(
    () => filteredPosts.slice(indexOfFirstPost, indexOfLastPost),
    [filteredPosts, indexOfFirstPost, indexOfLastPost]
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <h1 className="select-none">Blog Posts</h1>
      <div className="py-2 select-none">
        Tags:
        {tagList.map((tag) => (
          <button
            key={tag}
            className={clsx("filter", { "filter-selected": selectedTag === tag })}
            onClick={() => handleTagClick(tag)}
            aria-label={`Filter posts by ${tag}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {currentPosts.map((post) => (
        <article key={post.slug} className="mt-12 select-none">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date), "yyyy-MM-dd")}
          </p>
          <h2 className="mb-1 text-xl">
            <Link
              href={`/posts/${post.slug}`}
              className="text-gray-900 dark:text-white dark:hover:text-blue-400"
            >
              {post.title}
            </Link>
          </h2>
          <div className="mb-1 text-gray-700 dark:text-gray-400 text-xs">
            {parseTags(post.tag).map((tag) => (
              <button
                key={tag}
                className="mr-2 hover:text-blue-400"
                onClick={() => handleTagClick(tag)}
                aria-label={`Filter posts by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="mb-3 text-sm text-gray-400 dark:text-gray-500">
            {post.description}
          </p>
        </article>
      ))}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
      />
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["date", "description", "slug", "title", "tag"]);
  return { props: { posts } };
};
