import React from 'react';
import Layout from '../components/Layout';

export const Test = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'About - Roland Shum',
      }}
    >
      <h1>About me</h1>
      <p>Based in Tallinn, Estonia. From Hong Kong originally.</p>
      <p>Active in IT field - system design / XR / Medical Software</p>
      <p>A beliver. A front liner. Tanky and try-hard.
        Yet it is short, focus on what I could do and get in touch with me to know more.
</p>

   
    </Layout>
  );
};

export default Test;
