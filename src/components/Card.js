import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Card.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

function Card({ id, title, img }) {
  const appCont = useContext(AppContext);

  //------------------------------------Bookmark a hero function----------------------------------------------------------
  const bookmarkAHero = () => {
    appCont.setBookmark([...appCont.bookmark, { id, title, img }]);
    localStorage.setItem(
      "bookmarked",
      JSON.stringify([...appCont.bookmark, { id, title, img }])
    );
  };

  //-------------------------------------------------------Delete a hero from bookmarks---------------------------------------------------
  const unbookmarkAHero = () => {
    let newArray = appCont.bookmark.filter((e) => e.id !== id);
    appCont.setBookmark(newArray);
    localStorage.setItem("bookmarked", JSON.stringify(newArray));
  };

  //----------------------------------Checking if heroes are bookmarked or not, (Rendering bookmark or unbookmark)------------------------
  let flag = true;
  const renderBookmarkedHeroes = appCont.bookmark.map((e) => {
    if (e.id === id) {
      flag = false;
      return (
        <button key={id} onClick={unbookmarkAHero}>
          <BookmarkIcon />
          Unbookmark
        </button>
      );
    }
  });

  return (
    <div className='card'>
      <img src={img} alt='' className='card__image' />
      <div className='card__name'>{title}</div>
      {flag === true ? (
        <button onClick={bookmarkAHero}>
          <BookmarkBorderIcon />
          Bookmark
        </button>
      ) : (
        renderBookmarkedHeroes
      )}
    </div>
  );
}

export default Card;
