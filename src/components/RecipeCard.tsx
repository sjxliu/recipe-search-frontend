import React from "react";
import { useEffect, useState, MouseEvent } from "react";
import "./styles/card.css";

function RecipeCard(props: {
  mongoId: any;
  userId: any;
  name: any;
  id: any;
  add: any;
  used:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  interface RecipeCardData {
    title: string;
    readyInMinutes: string;
    image: string;
    summary: string;
  }

  let cardData: RecipeCardData = {
    title: "",
    readyInMinutes: "",
    image: "",
    summary: "",
  };

  let [data, setData] = useState({});
  let [cardVis, setVis] = useState("initial");
  let [addVis, setAddVis] = useState("initial");

  const deleteFavorite = () => {
    fetch(
      `https://quiet-plains-41541.herokuapp.com/users/favorites/${props.mongoId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addFavorite = () => {
    if (props.userId) {
      fetch(
        `https://quiet-plains-41541.herokuapp.com/users/${props.userId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: props.name,
            recipeId: props.id,
          }),
        }
      );
    }
  };

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${props.id}/information`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => {
        console.log(err);
        setVis("none");
      });
  }, []);

  let addButton = (
    <span
      style={{ display: addVis }}
      className="add-button"
      onClick={() => {
        addFavorite();
        setAddVis("none");
      }}
    >
      +
    </span>
  );

  return (
    <div className="card" style={{ display: cardVis }}>
      <h2>{cardData?.title}</h2>
      <h3>Ready in {cardData?.readyInMinutes} minutes</h3>
      <span
        onClick={() => {
          setVis("none");
          deleteFavorite();
        }}
        className="close-button"
      >
        X
      </span>
      {props.add ? addButton : null}
      <img alt={cardData?.title} src={cardData?.image} />
      <p dangerouslySetInnerHTML={{ __html: cardData?.summary }} />
      <div style={{ textAlign: "center", marginTop: "10px", fontSize: "2rem" }}>
        {props.used}
      </div>
    </div>
  );
}

export default RecipeCard;
