import React from "react";
import { Link } from "react-router-dom";
import "./styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <h3 className="greeting">Welcome to the Recipeantor!</h3>
      <p className="desc">Find fullfiling and new recipes</p>
      <div className="to-app">
        <Link className="button" to="/nameSearch">
          <button className="search-button" style={{marginTop: '10px'}}>Search Recipes</button>
        </Link><br/>
        <Link className="button" to="/ingredientSearch">
          <button className="search-button" style={{width: '200px', marginTop: '10px'}}>Search By Ingredients</button>
        </Link>
      </div>
      <p className="credit">
        Background by:{" "}
        <a href="https://www.pexels.com/@martinpechy"> Martin Péchy</a> from{" "}
        <a href="https://www.pexels.com/">Pexels</a>
      </p>
    </div>
  );
}

export default Home;
