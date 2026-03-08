import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Script from "next/script";
import React, { JSX }  from "react";
import "../styles/globals.css";
import { useState } from "react";
import CookieConsent from "react-cookie-consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NPDB7LX";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [consent, setConsent] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {consent && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
      <CookieConsent
        flipButtons
        enableDeclineButton
        buttonText="Accept"
        declineButtonText="No, thanks"
        buttonStyle={{ background: "#ffffff" }}
        declineButtonStyle={{ background: "transparent" }}
        onAccept={() => {
          setConsent(true);
        }}
        onDecline={() => {
          setConsent(false);
        }}
      >
        I use Google Analytics 4 on this site to analyze website traffic and
        enhance your user experience
        <br /> By clicking the Accept button, you agree to me doing so.{" "}
        <a
          href="https://support.google.com/analytics/answer/12017362?hl=en"
          target="_blank"
        >
          More info
        </a>
      </CookieConsent>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
