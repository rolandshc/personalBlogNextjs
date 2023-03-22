import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [consent, setConsent] = useState(false);
  useEffect(() => {
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
        enableDeclineButton
        buttonText="Accept"
        declineButtonText="Reject"
        buttonStyle={{ background: "rgb(96 165 250)" }}
        declineButtonStyle={{ background: "transparent" }}
        onAccept={() => {
          setConsent(true);
        }}
        onDecline={() => {
          setConsent(false);
        }}
      >
        I use Google Analytics 4 to analyze website traffic and improve your
        browsing experience. By clicking "Accept" you consent to the use of
        these technologies on this website.
      </CookieConsent>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
