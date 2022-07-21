import React from 'react';
import Layout from '../components/Layout';

export const About = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'About - Roland Shum',
      }}
    >
      <div>
      <h1>About me</h1>
      <p>Based in Tallinn, Estonia. From Hong Kong originally.</p>
      <p>Active in software dev, AIML, XR</p>
      <p>A beliver. A front liner. Tanky and try-hard.
        Yet it is short, text me to know more.
      </p>
      <div>
      <p>Climbing Mount Fuji in 2015. #Japan 
      </p>
        <img src={`/images/climbFuji2015.jpeg`} width={900} height={900}></img>
      </div>
    </div>

    </Layout>
  );
};

export default About;
