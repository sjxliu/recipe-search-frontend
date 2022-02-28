import {useState, useEffect} from 'react'

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
        <div>
            <h2>Search By Name</h2>
            <input onChange={(e) => setQuery(e.target.value)}/>
            <div>{searchResults}</div>
        </div>
    )
}

export default NameSearch