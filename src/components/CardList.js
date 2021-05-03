import React, { useContext } from "react";
import "./CardList.css";
import Card from "./Card";
import { AppContext } from "../AppContext";

function CardList() {
  const appCont = useContext(AppContext);

  const renderBookmarkedHeroes = appCont.bookmark.map((hero) => {
    return (
      <Card key={hero.id} id={hero.id} title={hero.title} img={hero.img} />
    );
  });

  const renderHeroes = appCont.heroes.map((hero) => {
    return (
      <Card
        key={hero.id}
        id={hero.id}
        title={hero.name}
        img={hero.thumbnail.path + "/portrait_xlarge.jpg"}
      />
    );
  });

  return appCont.input === "" ? renderBookmarkedHeroes : renderHeroes;
}

export default CardList;
