import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
const pageNumbers = [];

for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
pageNumbers.push(i);
}

return (
<nav>
    <ul className="pagination" style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
    {pageNumbers.map((number) => (
        <li key={number} style={{ margin: '5px' }}>
        <a  className="text-gray-900 dark:text-white dark:hover:text-blue-400" onClick={() => paginate(number)} href="#!" style={{ textDecoration: 'none' }}>
            {number}
        </a>
        </li>
    ))}
    </ul>
</nav>
);
};

export default Pagination;
