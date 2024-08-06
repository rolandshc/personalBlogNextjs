import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import { PostType } from "../types/post";
import { GetStaticProps } from "next";
import Pagination from "../components/Pagination";

type BlogProps = {
  posts: PostType[];
};

export default function Blog({ posts }: BlogProps): JSX.Element {
  const router = useRouter();
  const initialTag = router.query.tag ? (router.query.tag as string) : "All";
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [tagList, setTagList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

  useEffect(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tag.split(",").forEach((tag) => tags.add(tag.trim()));
    });
    setTagList(["All", ...Array.from(tags).sort()]);
  }, [posts]);

  const handleTagClick = (newTag: string) => {
    setSelectedTag(newTag);
    setCurrentPage(1);
  };

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) => post.tag.includes(selectedTag));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <h1 className="select-none">Blog Posts</h1>
      <div className="py-2 select-none">
        Tags:
        {tagList.map((tag) => (
          <button
            key={tag}
            className={`filter ${
              selectedTag === tag ? "filter-selected" : ""
            }`}
            onClick={() => handleTagClick(tag)}
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
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h2>
          <div className="mb-1 text-gray-700 dark:text-gray-400 text-xs">
            {post.tag.split(",").map((tag) => (
              <button
                key={tag.trim()}
                className="mr-2 hover:text-blue-400"
                onClick={() => handleTagClick(tag.trim())}
              >
                {tag.trim()}
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
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["date", "description", "slug", "title", "tag"]);
  return { props: { posts } };
};