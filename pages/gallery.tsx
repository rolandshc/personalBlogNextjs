import React from 'react';
import Layout from '../components/Layout';
import GridGallery from "../components/GridGallery";


export const Gallery = (): JSX.Element => {
  const images = [
    "/images/over-baltic.png",
    "/images/hong-kong-night.png",

  ]
  return (
    <Layout>
      <h2 className="py-3">I love travelling.</h2>
      <GridGallery images={images}/>
    </Layout>
  );
};

export default Gallery;
