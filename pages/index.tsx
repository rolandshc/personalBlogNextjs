import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { getAllPostsByTag } from '../lib/api';
import { getLatestPosts } from '../lib/api';
import { PostType } from '../types/post';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
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
      <br/>

      <h2 className='pt-8'>My latest posts:</h2> 

      {posts.map((post) => (
        <article key={post.slug} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date), 'MMMM dd, yyyy')}
          </p>
          <h1 className="mb-2 text-xl">
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h1>
          <p className="mb-3">{post.description}</p>
        </article>
      ))}

      
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getLatestPosts( 2 ,['date', 'description', 'slug', 'title','tag']);

  return {
    props: { posts },
  };
};

export default Index;
