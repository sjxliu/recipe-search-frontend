import './App.css';

import {Routes, Route, Link} from 'react-router-dom'
import {useState} from 'react'

import NameSearch from './components/NameSearch';
import Home from './components/Home';
import IngredientsSearch from './components/IngredientsSearch';
import RecipeSummary from './components/RecipeSummary';

function App() {
  let [visibility, setVis] = useState('none')

  const loginUser = (username, password) => {
    console.log(username, password)
  }
  
  return (
    <div className="App">
      <h1 className='title'>What's To Eat?</h1>
      <span className='log-sign-in' onClick={() => setVis('initial')} style={{position: 'absolute', top: '1vw', right: '2vw'}}>Log In/Sign In</span>
      <div  className='navbar'>
        <span className='home-btn'><Link to='/'>Home</Link></span>
        <span className='name-search-btn'><Link to='/nameSearch'>Search By Name</Link></span>
        <span className='i-search-btn'><Link to='/ingredientSearch'>Search By Ingredients</Link></span>
        <span className='sum-btn'><Link to='/recipeSummary'>Get Summary Of Recipe</Link></span>
      </div>
      <hr/>

      <div style={{position: 'fixed', height: '50%', width: '50%', display: visibility, backgroundColor: 'white', right: '25%', border: '2px solid', borderRadius: '20px'}}>
        <h1>Login</h1>
        <form onSubmit={(e) => {
          e.preventDefault()
          loginUser(e.target[0].value, e.target[1].value)
          }}>
          <label>
            Username:
            <input/>
          </label><br/>
          <label>
            Password:
            <input/>
          </label><br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nameSearch' element={<NameSearch />} />
        <Route path='/ingredientSearch' element={<IngredientsSearch />} />
        <Route path='/recipeSummary' element={<RecipeSummary />} />
      </Routes>
    </div>
  );
}

export default App;
