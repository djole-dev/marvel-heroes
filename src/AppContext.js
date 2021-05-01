import { createContext, useState} from "react";
import axios from "axios";
import Card from "./components/Card";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [input, setInput] = useState("");

  const [heroes, setHeroes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroesPerPage, setHeroesPerPage] = useState(20);

  const [bookmark, setBookmark] = useState(JSON.parse(localStorage.getItem("bookmarked")) || []);

  //-----------------------------------Getting bookmarked heroes from local storage-----------------------------------------------------
  /*
  useEffect(() => {
    setBookmark(JSON.parse(localStorage.getItem("bookmarked")) || "[]");
  },[]);*/

  //-------------------------------------------Fetching data from API-------------------------------------------------------------------
  const fetchData = async (input) => {
    setInput(input);
    if (input !== "") {
      const response = await axios(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input}&limit=100&ts=1&apikey=${process.env.REACT_APP_MARVEL_KEY}&hash=${process.env.REACT_APP_MARVEL_HASH}`
      );
      if (response.data.code === 200) {
        setHeroes(response.data.data.results);
      }
    }
  };

  //----------------------------Setting up pagination and currentHeroes that are currently on screen----------------------------------
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //-----------------------------------Rendering heroes that you searched for or bookmarked heroes----------------------------------------------
  const renderHeroes = currentHeroes.map((hero) => {
    return (
      <Card
        key={hero.id}
        id={hero.id}
        title={hero.name}
        img={hero.thumbnail.path + "/portrait_xlarge.jpg"}
      />
    );
  });

  const renderBookmarkedHeroes = JSON.parse(
    localStorage.getItem("bookmarked") || "[]"
  ).map((hero) => {
    return (
      <Card key={hero.id} id={hero.id} title={hero.title} img={hero.img} />
    );
  });

  // ---------------------------------Decision making what to render on the screen depending on the input field state----------------------------
  const whatToRender = () => {
    if (input !== "") {
      return renderHeroes;
    } else if (input === "") {
      return renderBookmarkedHeroes;
    }
  };

  return (
    <AppContext.Provider
      value={{
        bookmark,
        setBookmark,
        input,
        setInput,
        heroes,
        setHeroes,
        currentPage,
        setCurrentPage,
        heroesPerPage,
        setHeroesPerPage,
        fetchData,
        paginate,
        whatToRender,
      }}>
      {children}
    </AppContext.Provider>
  );
};
