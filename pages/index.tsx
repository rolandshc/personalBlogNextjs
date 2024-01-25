import React from "react";
import Layout from "../components/Layout";

export const Index = (): JSX.Element => {
  return (
    <Layout>
      <div className="typewriter">
        <h1>
          <code className="text-xl sm:text-xl md:text-3xl lg:text-6xl select-none">
          新しい时代を作るのは老人ではない
          </code>
        </h1>
      </div>
      <p className="py-5 sm:py-20 select-none ">
        Welcome to my personal blog. Built with{" "}
        <a href="https://nextjs.org/" target="_blank">
          NextJS
        </a>
        ,{" "}
        <a href="https://tailwindcss.com/" target="_blank">
          Tailwindcss
        </a>
        &nbsp;and&nbsp;
        <a href="https://www.typescriptlang.org/" target="_blank">
          TypeScript
        </a>
        .
      </p>
      <a
        href="https://github.com/rolandshc/personalBlogNextjs"
        className="inline-block px-4 py-2 rounded-md text-white dark:text-white bg-gray-600 hover:bg-gray-700 hover:text-white dark:hover:text-white"
        target="_blank"
      >
        source code
      </a>
      <br />
    </Layout>
  );
};

export default Index;
