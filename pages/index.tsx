import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { getLatestPosts } from '../lib/api';
import { PostType } from '../types/post';
import {useState, useEffect} from'react';
import {StateType} from '../types/state';

type IndexProps = {
  posts: PostType[];
};


export const Index = ({ posts }: IndexProps): JSX.Element => {
  const [tag, setTag] = useState<String>('latest');
  
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      const id = e.currentTarget.id;
      setTag(id);
    };
    
    let renderPosts = posts
    let renderPostsNum
    
    
    
    
    
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
      
      <h2 className='pt-8'>My blog posts:</h2> 
      <br/>
      <div>
      <a><button className="mb-2 pr-3" id='all' onClick={handleClick}>All</button></a>
      <a><button className="mb-2 pr-3" id='development' onClick={handleClick}>Development</button></a>
      <a><button className="mb-2 pr-3" id='personal' onClick={handleClick}>Personal</button></a>
      </div>
      
      {
        (() => {
          if(tag ==='latest') {
            renderPostsNum = 3
          } 
          else if(tag !=='all') {
            renderPosts = renderPosts.filter((post1) => ( post1.tag == tag))
            renderPostsNum = 10
          }
          else{
            renderPostsNum = 100
          }
            return (renderPosts.map((post) => (
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
              <p className="mb-1 text-gray-300 dark:text-gray-600 text-xs">{post.tag}</p>
              <p className="mb-3 text-sm">{post.description}</p>
              </article>
              )).slice(0,renderPostsNum))
            
          })()  
        }  
        
        
        
        
        
        
        </Layout>
        );
      };
      
      export const getStaticProps: GetStaticProps = async () => {
        const posts = getAllPosts(['date', 'description', 'slug', 'title','tag']);
        
        return {
          props: { posts },
        };
      };
      
      export default Index;
      