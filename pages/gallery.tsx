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
      <h2 className="py-3">Photography Gallery</h2>
      <p>
        I started taking photos with my first Nikon DSLR camera since 2010. I
        love to travel and read history.
      </p>
      <p>
        I would implement a category functionality here. Pending to update.
        <br/>Current Gears below..
        <br/><br/>Body: Sony a7 III
        </p>
        Lenses:
      <ul className="px-4">
        <li>Lvoigtlander 15mm f4.5 iii</li>
        <li>Sony FE 24-105mm F4 G OSS</li>
        <li>Sony FE 85mm F1.8</li>
        </ul>
      <GridGallery images={images} />
    </Layout>
  );
};

export default Gallery;
