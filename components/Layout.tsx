import React from "react";
import { MetaProps } from "../types/layout";
import Head from "./Head";
import Navigation from "./Navigation";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = "https://rolandshum.com";

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const year = new Date().getUTCFullYear();
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <div className="max-w-5xl px-8 mx-auto">
          <div className="flex items-start justify-between">
            <Navigation />
            <div className="float-right">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-5xl px-8 mx-auto py-8">{children}</div>
      </main>
      <footer className="select-none py-8">
        <div className="max-w-5xl px-8 mx-auto text-gray-600 dark:text-gray-400">
          Copyright © {year} Roland Shum
          <a
            href="https://www.linkedin.com/in/rolandshum"
            className="text-gray-900 dark:text-white px-3 py-2"
            target="_blank"
          >
            <Image
              alt={`linkedin`}
              src={`/images/linkedin.png`}
              width={15}
              height={15}
              priority
            />
          </a>
          <a
            href="https://github.com/rolandshc"
            className="text-gray-900 dark:text-white px-3 py-2"
            target="_blank"
          >
            <Image
              alt={`github`}
              src={`/images/github-11-xxl.png`}
              width={15}
              height={15}
              priority
            />
          </a>
          <br />
          <span className="text-gray-500 ">
          All things are so very uncertain, and that's exactly what makes me feel reassured.
            <br />
            Tove Jansson
          </span>
        </div>
      </footer>
    </>
  );
};

export default Layout;

export const getLayout = (page) => getLayout(<Layout>{page}</Layout>);
