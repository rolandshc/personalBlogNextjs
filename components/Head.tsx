import NextHead from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MetaProps } from "../types/layout";

export const WEBSITE_HOST_URL = "https://rolandshum.com";

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta: MetaProps = {
    title: "Roland Shum",
    description:
      "Hello I am Roland Shum. A software developer based in Tallinn, Estonia. This is my personal website sharing my research, hobbies and thoughts.",
    image: `${WEBSITE_HOST_URL}/images/site-preview.jpeg`,
    type: "website",
    ...customMeta,
  };
  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Roland Shum" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
        {"@context": "http://schema.org","@type": "Person","familyName": "Shum","givenName": "Roland","worksFor": "https://rolandshum.com/","jobTitle": "Software Engineer","alumniOf": {"@type": "EducationalOrganization","name": "University of Tartu","url":"https://ut.ee/et"},"image": "https://rolandshum.com/_next/image?url=%2Fimages%2Fbrussels-2023.jpeg&w=640&q=75","gender": "http://schema.org/Male","sameAs": ["https://www.linkedin.com/in/rolandshum/","https://github.com/rolandshc","https://rolandshum.com/"]}
        `,
        }}
        key="item-jsonld"
      />
    </NextHead>
  );
};

export default Head;
