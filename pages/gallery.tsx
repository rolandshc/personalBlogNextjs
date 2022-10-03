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
        travel and read history. Since 2019, I have been based in Tallinn.
      </p>
      <p>
        I would implement the categories functionality here. Pending to update.
      </p>
      <GridGallery images={images} />
    </Layout>
  );
};

export default Gallery;
