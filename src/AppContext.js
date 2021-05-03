import { createContext, useState } from "react";
import axios from "axios";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [input, setInput] = useState("");

  const [heroes, setHeroes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfHeroes, setTotalNumberOfHeroes] = useState(0);

  const [bookmark, setBookmark] = useState(
    JSON.parse(localStorage.getItem("bookmarked")) || []
  );

  //-------------------------------------------Fetching data from API-------------------------------------------------------------------
  const fetchData = async (input,page = 1) => {
    let offset = 20 * (page - 1);
    setInput(input);
    if (input !== "") {
      const response = await axios(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input}&limit=20&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_MARVEL_KEY}&hash=${process.env.REACT_APP_MARVEL_HASH}`
      );
      if (response.data.code === 200) {
        setHeroes(response.data.data.results);
        setTotalNumberOfHeroes(response.data.data.total);
        setCurrentPage(page);
      }
    }
  };


  return (
    <AppContext.Provider
      value={{
        totalNumberOfHeroes,
        bookmark,
        setBookmark,
        input,
        setInput,
        heroes,
        setHeroes,
        currentPage,
        setCurrentPage,
        fetchData,
      }}>
      {children}
    </AppContext.Provider>
  );
};
