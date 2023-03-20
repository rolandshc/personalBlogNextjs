import React from "react";
import Layout from "../components/Layout";
import GridGallery from "../components/GridGallery";

export const Gallery = (): JSX.Element => {
  const images = [
    "/images/gallery/cafe-regatta-helsinki.JPG",
    "/images/gallery/colosseum-rome.JPG",
    "/images/gallery/pantheon-rome.JPG",
    "/images/gallery/florence.JPG",
    "/images/gallery/venice.JPG",
    "/images/gallery/vilnius.JPG",
  ];
  return (
    <Layout>
      <h1 className="select-none">Photography Gallery</h1>
      <p className="select-none">
        I started taking photos with my first Nikon DSLR since 2010. I love to
        travel and read history.
        <br />
        I would implement a category functionality here. Pending to update.
        <br />
        Current gears below..
        <br />
        <br />
        Sony α7 III
      </p>
      <ul className="px-4 select-none">
        - Voigtlander 15mm f4.5 iii
        <br />
        - Sony FE 24-105mm F4 G OSS
        <br />
        - Sony FE 85mm F1.8
        <br />
      </ul>
      <br />
      <GridGallery images={images} />
    </Layout>
  );
};

export default Gallery;
