import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import React, { JSX }  from "react";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    let abortController = new AbortController();
    if (consent) {
      // googletagmanager script
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NPDB7LX');`; // your GTM link
      document.getElementsByTagName("head")[0].appendChild(s);
      // googletagmanager iframe
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-NPDB7LX";
      iframe.width = "0";
      iframe.height = "0";

      const noscript = document.createElement("noscript");
      noscript.appendChild(iframe);
      document.getElementsByTagName("body")[0].appendChild(iframe);

      return () => {
        document.getElementsByTagName("head")[0].removeChild(s);
        document.getElementsByTagName("body")[0].removeChild(iframe);
        abortController.abort();
      };
    }
  }, [consent]);

  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="dark"
      disableTransitionOnChange
    >
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
