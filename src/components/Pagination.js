import React, { useContext } from "react";
import "./Pagination.css";
import { AppContext } from "../AppContext";

function Pagination() {
  const appCont = useContext(AppContext);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(appCont.totalNumberOfHeroes / 20); i++) {
    pageNumbers.push(i);
  }

  const changePage = (number) => {
    appCont.setCurrentPage(number);
    appCont.fetchData(appCont.input, number);
  };

  return (
    <div className='pagination'>
      <ul>
        {pageNumbers.map((number) =>
          appCont.currentPage === number ? (
            <li
              key={number}
              className='numb active'
              onClick={() => changePage(number)}>
              <span>{number}</span>
            </li>
          ) : (
            <li
              key={number}
              className='numb'
              onClick={() => changePage(number)}>
              <span>{number}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Pagination;
