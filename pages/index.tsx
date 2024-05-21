import React from "react";
import Layout from "../components/Layout";

export const Index = (): JSX.Element => {
  return (
    <Layout>
      <div className="typewriter">
        <h1>
          <code className="text-xs sm:text-xs md:text-3xs lg:text-6xs select-none">
          All things are so very uncertain 😇
          </code>
        </h1>
      </div>
      <p className="py-5 sm:py-20 select-none ">
        Welcome to my personal blog. Built with{" "}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          NextJS
        </a>
        ,{" "}
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
          Tailwindcss
        </a>
        &nbsp;and&nbsp;
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          TypeScript
        </a>
        .
      </p>
      <br />
    </Layout>
  );
};

export default Index;
