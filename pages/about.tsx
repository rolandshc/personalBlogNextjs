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
      <div>
        <h1>About me</h1>
        <p>
          Currently based in Tallinn, Estonia. Raised in Hong Kong. Studied in
          Israel and Estonia.
        </p>
        <p>Active in software development, AIML and XR.</p>
        <p>
          Blogging helps me to reflect and learn.
        </p>
        <p>
          A beliver. A front liner. Tanky and try-hard.
        </p>
        <div>
          <p>Summer in Rhodes, Greece @2022</p>
          <Image
            alt={`rhodes`}
            src={`/images/rhodes-2022.JPG`}
            width={1350}
            height={900}
            priority
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
