import React from "react";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) return null;

  return (
    <nav aria-label="Pagination Navigation">
      <ul className="flex justify-center list-none p-0 m-0">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`border border-gray-400 bg-transparent cursor-pointer px-3 py-2 rounded text-gray-900 dark:text-white dark:hover:text-blue-400 ${
                currentPage === number
                  ? "bg-gray-200 dark:bg-gray-700 font-bold"
                  : ""
              }`}
              aria-label={`Go to page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
