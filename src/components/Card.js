import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Card.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

function Card({ id, title, img }){
  const appCont = useContext(AppContext);

  //------------------------------------Logic for bookmarking a hero----------------------------------------------------------
  const bookmarkAHero = () => {
    if (appCont.bookmark.length === 0) {// Checking if local storage has 0 bookmarked heroes
      appCont.setBookmark((prevArr) => [...prevArr, { id, title, img }]);
      localStorage.setItem(
        "bookmarked",
        JSON.stringify([...appCont.bookmark, {id,title,img}])
      );
      return;
    }
    console.log("bookmark");
    //Then checking if hero already exists in localstorage (prevents duplicates)
    let contains = false;
    for (let i = 0; i < appCont.bookmark.length; i++) {
      if (appCont.bookmark[i].id === id) {
        contains = true;
      }
    }
    if (contains === false) {
      //If hero doesn't exists in local storage, add hero
      appCont.setBookmark((prevArr) => [...prevArr, { id, title, img }]);
      localStorage.setItem(
        "bookmarked",
        JSON.stringify([...appCont.bookmark, { id, title, img }])
      );
    } else {
      //If hero already exist, do nothing, set flag to false
      contains = false;
    }
  };

  //-------------------------------------------------------Delete hero from bookmarks---------------------------------------------------
  const unbookmarkAHero = () => {
    //we don't check here if hero is in local storage beacause only bookmarked hereos have this function
    let newArray = appCont.bookmark;
    let newIndex;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === id) {
        newIndex = i; //We find the index of the hero we want to delete
      }
    }
    if (newIndex > -1) {
      //Than we splice the array and update the local storage with a new array
      console.log("splice");
      newArray.splice(newIndex, 1);
    }

    appCont.setBookmark((prevArray) => [...newArray]);

    localStorage.setItem("bookmarked", JSON.stringify(newArray));
  };

  //---------------------------------------------------Checking if heroes are bookmarked or not, (Rendering bookmark or unbookmark)----------
  const renderBookmark = () => {
    let switcher = false;
    
    if (appCont.bookmark.length === 0) {
      return (
        <button onClick={bookmarkAHero}>
          <BookmarkBorderIcon />
          Bookmark
        </button>
      );
    }
    for (let i = 0; i < appCont.bookmark.length; i++) {
      if (appCont.bookmark[i].id === id) {
        switcher = true;
      }
    }
    if (switcher === true) {
      switcher = false;
      return (
        <button onClick={unbookmarkAHero}>
          <BookmarkIcon />
          Unbookmark
        </button>
      );
    } else {
      switcher = false;
      return (
        <button onClick={bookmarkAHero}>
          <BookmarkBorderIcon />
          Bookmark
        </button>
      );
    }
  };

  return (
    <div className='card'>
      <img src={img} alt='' className='card__image' />
      <div className='card__name'>{title}</div>
      {renderBookmark()}
    </div>
  );
}

export default Card;
