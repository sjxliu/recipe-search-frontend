import { useState } from "react";
import IngredientBar from "./IngredientBar";
import "./styles/ingredients-search.css";
import RecipeCard from "./RecipeCard";

function IngredientsSearch(props) {
  let [ingredients, setIngredients] = useState([]);
  let [searchBars, setBars] = useState([0]);
  let [results, updateResults] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const searchForRecipe = () => {
    if (ingredients) {
      fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",")}&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then((res) => updateResults(res));
    }
  };

  const searchElems = searchBars.map((num, index) => {
    if (index !== searchBars.length - 1) {
      return (
        <div key={index}>
          <IngredientBar
            className="add-ingred"
            addIngredient={addIngredient}
            id={index}
          />
        </div>
      );
    } else {
      return (
        <div className="testing" key={index}>
          <IngredientBar addIngredient={addIngredient} id={index} />
          <span
            className="add-ingred"
            onClick={() => setBars([...searchBars, searchBars.length])}
          >
            Add Ingredient
          </span>
        </div>
      );
    }
  });

  const searchResults = results.map((res, index) => {
    return(
      <RecipeCard id={res.id} key={index} add='true' userId={props.userId} name={props.name} used={res.usedIngredientCount}/>
    )
  });

  return (
    <div className="search-container">
      {searchElems}
      <button className="search-btn" onClick={() => searchForRecipe()}>
        Search
      </button>
      <div className="results">{searchResults ? searchResults : null}</div>
    </div>
  );
}

export default IngredientsSearch;
