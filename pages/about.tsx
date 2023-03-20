import React from "react";
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
            alt={`brussels`}
            src={`/images/brussels-2023.jpeg`}
            width={300}
            height={300}
            priority
          />
        </div>
        <p>
          Based in Tallinn, Estonia. Raised in Hong Kong. Studied in Israel and
          Estonia.
        </p>
        <p>Active in software development, Machine Learning and XR.</p>
        <p>Blogging helps me to reflect and learn.</p>
        <p>Welcome to any small talks and beers 🍻</p>
      </div>
    </Layout>
  );
};

export default About;
