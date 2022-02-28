import { useState, useEffect } from "react";
import "./styles/bar.css";

function IngredientBar(props) {
  let [query, setQuery] = useState("");
  let [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${process.env.REACT_APP_API_KEY}&number=4`
      )
        .then((res) => res.json())
        .then((res) => setResults(res.results));
    } else {
      setResults([]);
    }
  }, [query]);

  const suggestions = results.map((result, index) => (
    <p
      onClick={(e) => {
        props.addIngredient(result.name);
        setQuery(result.name);
      }}
      key={index}
      className="suggestions"
    >
      {result.name}
    </p>
  ));

  return (
    <div className="div1">
      <input
        className="input"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div
        className="click"
        onClick={(e) => (e.target.parentNode.style = "display: none")}
      >
        {suggestions ? suggestions : null}
      </div>
    </div>
  );
}

export default IngredientBar;
