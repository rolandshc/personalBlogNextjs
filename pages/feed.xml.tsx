import { GetServerSideProps } from "next";
import { generateRssFeed } from "../lib/rss";

const Feed = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = generateRssFeed();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(feed);
  res.end();

  return { props: {} };
};

export default Feed;
