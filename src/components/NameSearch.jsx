import {useState, useEffect} from 'react'
import "./styles/name-search.css"

function NameSearch(){
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
            <h6 key={index}>{recipe.title}</h6>
        )
    })

    return (
        <div className='container'>
            <h2 className='heading'>Search By Name</h2>
            <input className='input' placeholder='Search Recipes' onChange={(e) => setQuery(e.target.value)}/>
            <div className='results'>{searchResults}</div>
        </div>
    )
}

export default NameSearch