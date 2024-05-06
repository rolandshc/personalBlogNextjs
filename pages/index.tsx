import React from "react";
import Layout from "../components/Layout";

export const Index = (): JSX.Element => {
  return (
    <Layout>
      <div className="typewriter">
        <h1>
          <code className="text-sm sm:text-sm md:text-3sm lg:text-6sm select-none">
          All things are so very uncertain, and that's exactly what makes me feel reassured.
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
      <br />
    </Layout>
  );
};

export default Index;
