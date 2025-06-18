import React, { JSX } from "react";
import Layout from "../components/Layout";
import Image from "next/image";

export const About = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: "About - Roland Shum",
      }}
    >
      <div className="select-none">
        <h1>About me</h1>
        <div className="py-3">
          <Image
            alt={`Roland Shum`}
            src={`/images/rhodes-2022.jpeg`}
            width={400}
            height={300}
            priority
          />
        </div>
        <p>
          Based in Tallinn, Estonia. Raised in Hong Kong. Studied in Israel and
          Estonia 🇪🇪
        </p>
        <p>Passionate about software product quality 💻</p>
        <p>Spatial computing, traveling and gaming as my hobbies 🚀</p>
        <p>Blogging helps me to reflect and learn ✍🏻</p>
        <p>Welcome to any small talks and beer 🍻</p>
        <p><a href="https://www.linkedin.com/in/rolandshum/">Find me on linkedin</a></p>

      </div>
    </Layout>
  );
};

export default About;
