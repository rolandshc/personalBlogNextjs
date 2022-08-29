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
      I love travelling.
      <GridGallery images={images}/>
    </Layout>
  );
};

export default Gallery;
