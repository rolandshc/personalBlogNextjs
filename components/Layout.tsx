import React from "react";
import { MetaProps } from "../types/layout";
import Head from "./Head";
import Navigation from "./Navigation";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import CookieConsent from "react-cookie-consent";
import { useState, useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = "https://rolandshum.com";

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const year = new Date().getUTCFullYear();
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    if (consent) {
      // googletagmanager script
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://www.googletagmanager.com/ns.html?id=GTM-NPDB7LX"; // your GTM link
      document.getElementsByTagName("head")[0].appendChild(s);

      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-NPDB7LX';
      iframe.title = 'example';
      iframe.width = '0';
      iframe.height = '0';
    
      const noscript = document.createElement('noscript');
      noscript.appendChild(iframe);
      document.getElementsByTagName("body")[0].appendChild(iframe);

      return () => {
        document.getElementsByTagName("head")[0].removeChild(s);
        document.getElementsByTagName("body")[0].removeChild(iframe);
      };
      // googletagmanager iframe
      



    }
  }, [consent]);
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
        {/* <script>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NPDB7LX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </script> */}
        <div className="max-w-5xl px-8 mx-auto py-8">{children}</div>
        <h1>{consent ? "CONSENT" : "NOT CONSENT"}</h1>
      </main>
      <CookieConsent
        enableDeclineButton
        onAccept={() => {
          setConsent(true);
        }}
        onDecline={() => {
          setConsent(false);
        }}
      >
        We use cookies and Google Analytics 4 to analyze website traffic and
        improve your browsing experience. By clicking "I understand" you consent
        to the use of these technologies on this website.
      </CookieConsent>
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
            So we do not focus on what is seen, but on what is unseen. For what
            is seen is temporary, but what is unseen is eternal.
            <br />
            (2 Corinthians 4:18)
          </span>
        </div>
      </footer>
    </>
  );
};

export default Layout;

export const getLayout = (page) => getLayout(<Layout>{page}</Layout>);
