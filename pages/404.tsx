import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout
      customMeta={{
        title: "404 - Page Not Found",
      }}
    >
      <div className="text-center py-20">
        <h1>404 - Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="text-blue-500 hover:underline"
        >
          Go back home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
