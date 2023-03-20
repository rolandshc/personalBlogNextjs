import React from "react";
import { MetaProps } from "../types/layout";
import Head from "./Head";
import Navigation from "./Navigation";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
import Script from 'next/script';

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
      <Script strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NPDB7LX');
  `,
  }}/>
      <header>
        <div className="max-w-5xl px-8 mx-auto">
          <div className="flex items-center justify-between py-6">
            <Navigation />
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main>
      <Script />
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NPDB7LX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    }}
  />
        <div className="max-w-5xl px-8 py-4 mx-auto">{children}</div>
      </main>
      <footer className="select-none py-8">
        <div className="max-w-5xl px-8 mx-auto text-gray-600 dark:text-gray-600">
          Built by{" "}
          <a
            className="text-gray-600 dark:text-gray-600"
            href="https://www.linkedin.com/in/rolandshum"
            target="_blank"
          >
            Roland Shum
          </a>
            <a href="https://www.linkedin.com/in/rolandshum" className="text-gray-900 dark:text-white px-3 py-2" target="_blank">
              <Image
                alt={`linkedin`}
                src={`/images/linkedin.png`}
                width={15}
                height={15}
                priority
              />
            </a>
            <a href="https://github.com/rolandshc" className="text-gray-900 dark:text-white px-3 py-2" target="_blank">
              <Image
                alt={`github`}
                src={`/images/github-11-xxl.png`}
                width={15}
                height={15}
                priority
              />
            </a>
          <br />
          Copyright © {year}
          <br />
          <span className="text-gray-200 dark:text-gray-800 ">
            So we do not focus on what is seen, but on what is unseen. For what
            is seen is temporary, but what is unseen is eternal.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Layout;

export const getLayout = (page) => getLayout(<Layout>{page}</Layout>);
