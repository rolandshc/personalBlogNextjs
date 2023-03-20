import React from "react";
import ThemeSwitch from "./ThemeSwitch";

const Navigation = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 ">
      <div className="block sm:inline-block md:py-5 py-3">
        <a className="text-gray-900 dark:text-white" href="/">
          Roland Shum&nbsp;
        </a>
        <ThemeSwitch />
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
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
          <a
            href="/gallery"
            className="block sm:inline-block text-gray-900 dark:text-white mr-8 md:py-5 py-3 px-5"
          >
            Photography 📷
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
