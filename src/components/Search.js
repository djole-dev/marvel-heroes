import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "../marvel.png";
import Pagination from "./Pagination";

//const hash = "a9ed5d73e1150f09edcb892103eb483d";

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
            appCont.fetchData(e.target.value);
          }}
        />
      </div>
      <div className='search__result'>{appCont.whatToRender()}</div>
      <div className='search__pagination'>
        {appCont.input === "" ? null : (
          <Pagination
            heroesPerPage={appCont.heroesPerPage}
            totalHeroes={appCont.heroes.length}
            paginate={appCont.paginate}
            activePage={appCont.currentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
