import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "../marvel.png";
import Pagination from "./Pagination";
import CardList from "./CardList";

function Search() {
  const appCont = useContext(AppContext);

  return (
    <div className='search'>
      <div className='search__container'>
        <img src={Logo} alt='' className='search__logo' />
        <SearchIcon className='search__icon' />
        <input
          placeholder='Enter the name of your Marvel superhero...'
          className='search__input'
          type='text'
          onChange={(e) => {
            appCont.fetchData(e.target.value, 1);
          }}
        />
      </div>
      <div className='search__result'>
        <CardList />
      </div>
      <div className='search__pagination'>
        {appCont.input === "" ? null : <Pagination />}
      </div>
    </div>
  );
}

export default Search;
