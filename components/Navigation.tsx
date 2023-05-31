import React from "react";

const Navigation = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between flex-wrap">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="block sm:inline-block md:py-5 py-3 pr-8">
          <a className="text-gray-900 dark:text-white font-bold" href="/">
            ROLAND&nbsp;
          </a>
        </div>
        <div className="text-sm lg:flex-grow">
          <a
            href="/about"
            className="block sm:inline-block text-gray-900 dark:text-white mr-8 md:py-5 py-3 px-5"
          >
            About 🤘
          </a>
          <a
            href="/blog"
            className="block sm:inline-block text-gray-900 dark:text-white mr-8 md:py-5 py-3 px-5"
          >
            Blog 📝
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
