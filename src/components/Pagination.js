import React from "react";
import "./Pagination.css";

function Pagination({ heroesPerPage, totalHeroes, paginate, activePage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalHeroes / heroesPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className='pagination'>
      <ul>
        {pageNumbers.map((number) =>
          activePage === number ? (
            <li
              key={number}
              className='numb active'
              onClick={() => paginate(number)}>
              <span>{number}</span>
            </li>
          ) : (
            <li key={number} className='numb' onClick={() => paginate(number)}>
              <span>{number}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Pagination;
