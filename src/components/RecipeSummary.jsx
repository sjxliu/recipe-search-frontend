import { useState, useEffect } from "react";
import "./styles/sum.css";

function RecipeSummary() {
  let [input, updateInput] = useState(1);
  let [response, updateRes] = useState({});

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${input}/summary?apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => updateRes(res));
  }, [input]);

  return (
    <div className="page-container">
      <h2 className="heading">Summary of:</h2>
      <input
        placeholder="ID Number"
        className="input"
        onChange={(e) => updateInput(e.target.value)}
        type="number"
      />
      <p className="recipe-name">{response.title}</p>{" "}
      <p className="id">ID: {response.id}</p>
      <p
        className="results"
        dangerouslySetInnerHTML={{ __html: response.summary }}
      />
    </div>
  );
}
export default RecipeSummary;
