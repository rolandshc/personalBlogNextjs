import { GetServerSideProps } from "next";
import { generateSitemap } from "../lib/rss";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
