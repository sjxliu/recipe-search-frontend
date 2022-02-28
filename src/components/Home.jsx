import { Link } from "react-router-dom";
import "./styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <h3 className="greeting">Welcome to the Recipeantor!</h3>
      <p className="desc">Find fullfiling and new recipes</p>
      <div
        className="to-app"
      >
        <Link className="button" to="/nameSearch">
          <button>Search Recipes</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
