import Link from 'next/link';
import React from 'react';

const Navigation = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500">
      <div className="flex select-none items-center flex-shrink-0 text-gray-900 dark:text-white mr-6 py-2">
        Roland Shum
      </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <Link href="/">
        <a className="block sm:inline-block text-gray-900 dark:text-white mr-8 py-1">Blog 📝</a>
      </Link>
      <Link href="/about">
        <a className="block sm:inline-block text-gray-900 dark:text-white mr-8 py-1">About 🤘</a>
      </Link>
      <Link href="/gallery">
        <a className="block sm:inline-block text-gray-900 dark:text-white mr-8 py-1">Travel Gallery 🗺️</a>
      </Link>
      </div>
      </div>
    </nav>
  );
};

export default Navigation;
