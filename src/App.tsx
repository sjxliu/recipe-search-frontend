import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import NameSearch from "./components/NameSearch";
import Home from "./components/Home";
import IngredientsSearch from "./components/IngredientsSearch";
import Profile from "./components/Profile";
import React from "react";

function App(props: {
  account: {
    id: any;
    username:
      | boolean
      | null
      | undefined;
  };
}) {
  let [loginVis, setLoginVis] = useState("none");
  let [signUpVis, setSignUpVis] = useState("none");
  let [loginUsername, updateLoginUser] = useState("");
  let [loginPass, updateLoginPass] = useState("");
  let [signUpUsername, updateSignUpUser] = useState("");
  let [signUpPass, updateSignUpPass] = useState("");
  let [user, setUser] = useState({});
  let [message, setMessage] = useState("");
  let [loginButtonsVis, setLogButtonsVis] = useState("initial");
  let [profileButtonVis, setProfileButtonVis] = useState("none");

  interface userData {
    id: string;
    username: string;
  }

  let userData: userData = {
    id: "",
    username: "",
  };

  const loginUser = () => {
    if (loginUsername) {
      fetch(
        `https://quiet-plains-41541.herokuapp.com/users/auth?username=${loginUsername}&password=${loginPass}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.isLogged) {
            setUser({
              username: loginUsername,
              id: res.userId,
            });
            setMessage("");
            updateLoginUser("");
            updateLoginPass("");
            setLoginVis("none");
            setLogButtonsVis("none");
            setProfileButtonVis("initial");
          } else {
            setMessage("The username or password entered was not correct");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const signUpUser = (_id: "string", _username: "string") => {
    if (signUpUsername) {
      fetch(`https://quiet-plains-41541.herokuapp.com/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signUpUsername,
          password: signUpPass,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.itWorked) {
            setUser({
              username: signUpUsername,
              id: res.userId,
            });
            setMessage("");
            updateSignUpUser("");
            updateSignUpPass("");
            setSignUpVis("none");
            setLogButtonsVis("none");
            setProfileButtonVis("initial");
          } else {
            setMessage(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const winStyles = {
    zIndex: "2",
    position: "fixed",
    height: "50%",
    width: "50%",
    right: "25%",
    border: "2px solid",
    borderRadius: "20px",
  };

  const upperButtonsStyles = {
    position: "absolute",
    top: "1vw",
    right: "2vw",
    display: "flex",
    color: "darkblue",
  };

  const styles = {
    login_btns: {
      ...upperButtonsStyles,
      display: loginButtonsVis,
    } as React.CSSProperties,
    link: {
      ...upperButtonsStyles,
      display: profileButtonVis,
    } as React.CSSProperties,
    loginWindow: {
      ...winStyles,
      display: loginVis,
    } as React.CSSProperties,
    signupWindow: {
      ...winStyles,
      display: signUpVis,
    } as React.CSSProperties,
  };

  return (
    <div className="App">
      <h1 className="title">What's To Eat?</h1>
      <div className="login-buttons" style={styles.login_btns}>
        <span onClick={() => setLoginVis("initial")}>Log In</span>
        <span
          onClick={() => setSignUpVis("initial")}
          style={{ marginLeft: "20px" }}
        >
          Sign Up
        </span>
      </div>
      <div style={styles.link}>
        <span>
          <Link to="/profile">Profile</Link>
        </span>
      </div>
      <div className="navbar">
        <span>
          <Link className="home-btns" to="/">
            Home
          </Link>
        </span>
        <span>
          <Link className="home-btns" to="/nameSearch">
            Search By Name
          </Link>
        </span>
        <span>
          <Link className="home-btns" to="/ingredientSearch">
            Search By Ingredients
          </Link>
        </span>
      </div>
      <hr />

      <div className="loginWindow" style={styles.loginWindow}>
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            onChange={(e) => updateLoginUser(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            onChange={(e) => updateLoginPass(e.target.value)}
          />
          <br />
          <br />
          <p className="login-message">{message ? message : null}</p>
          <div className="login-buttons">
            <input type="submit" value="Submit" />
            <button
              onClick={() => {
                updateLoginUser("");
                updateLoginPass("");
                setLoginVis("none");
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>

      <div className="loginWindow" style={styles.signupWindow}>
        <h1>Sign Up</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            {
              signUpUser;
            }
          }}
        >
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            onChange={(e) => updateSignUpUser(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            onChange={(e) => updateSignUpPass(e.target.value)}
          />
          <br />
          <br />
          <p className="login-message">{message ? message : null}</p>
          <div className="login-buttons">
            <input type="submit" value="Submit" />
            <button
              onClick={() => {
                updateSignUpUser("");
                updateSignUpPass("");
                setSignUpVis("none");
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nameSearch"
          element={
            <NameSearch userId={userData?.id} name={userData?.username} />
          }
        />
        <Route
          path="/ingredientSearch"
          element={
            <IngredientsSearch
              userId={userData?.id}
              name={userData?.username}
            />
          }
        />
        <Route path="/profile" element={<Profile account={user} />} />
      </Routes>
    </div>
  );
}

export default App;
