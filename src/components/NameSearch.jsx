import {useState, useEffect} from 'react'
import "./styles/name-search.css"
import RecipeCard from './RecipeCard';

function NameSearch(props){
    let [response, updateRes] = useState([])
    let [query, setQuery] = useState('')

    useEffect(() => {
        if(query){
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(res => updateRes(res.results))
        }
      }, [query])

    const searchResults = response.map((recipe, index) => {
        return(
            <RecipeCard id={recipe.id} key={index} add='true' userId={props.userId} name={props.name}/>
        )
    })

    return (
        <div className='container'>
            <h2 className='heading'>Search By Name</h2>
            <input className='input' placeholder='Search Recipes' onChange={(e) => setQuery(e.target.value)}/>
            <div className='search-results'>{searchResults}</div>
        </div>
    )
}

export default NameSearch