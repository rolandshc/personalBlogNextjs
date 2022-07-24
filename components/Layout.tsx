import React from 'react';
import { MetaProps } from '../types/layout';
import Head from './Head';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = 'https://nextjs-typescript-mdx-blog.vercel.app';

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <div className="max-w-5xl px-8 mx-auto">
          <div className="flex items-center justify-between py-6">
            <Navigation />
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-5xl px-8 py-4 mx-auto">{children}</div>
      </main>
      <footer className="py-8">
        <div className="max-w-5xl px-8 mx-auto text-gray-600 dark:text-gray-600">
          Built by{' '}
          <a
            className="text-gray-600 dark:text-gray-600"
            href="https://www.linkedin.com/in/rolandshum"
          >
            Roland Shum
          </a><br/>
          <span className="text-gray-200 dark:text-gray-800 ">So we do not focus on what is seen, but on what is unseen. For what is seen is temporary, but what is unseen is eternal.</span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
