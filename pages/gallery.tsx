import React from 'react';
import Layout from '../components/Layout';
import GridGallery from "../components/GridGallery";


export const Gallery = (): JSX.Element => {
  const images = [
    "/images/gallery/cafe-regatta-helsinki.JPG",
    "/images/gallery/colosseum-rome.JPG",
    "/images/gallery/pantheon-rome.JPG",
    "/images/gallery/florence.JPG",
    "/images/gallery/venice.JPG",
    "/images/gallery/vilnius.JPG"
  ]
  return (
    <Layout>
      <h2 className="py-3">I love travelling.</h2>
      <GridGallery images={images}/>
    </Layout>
  );
};

export default Gallery;
