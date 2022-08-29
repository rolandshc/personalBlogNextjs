import Link from 'next/link';
import React from 'react';
import Image from "next/image"

const Navigation = (): JSX.Element => {
  return (
    <nav>
      <Link href="/">
        <a className="text-gray-900 dark:text-white pr-6 py-4">Blog 📝</a>
      </Link>
      <Link href="/about">
        <a className="text-gray-900 dark:text-white px-6 py-4">About 🤘</a>
      </Link>
      <Link href="/gallery">
        <a className="text-gray-900 dark:text-white px-6 py-4">Travel Gallery 🗺️</a>
      </Link>
    </nav>
  );
};

export default Navigation;
