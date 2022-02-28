import {useState, useEffect} from 'react'

function IngredientBar(props) {
    let [query, setQuery] = useState('')
    let [results, setResults] = useState([])

    useEffect(() => {
        if(query){
            fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${process.env.REACT_APP_API_KEY}&number=4`)
            .then(res => res.json())
            .then(res => setResults(res.results))
        } else {
            setResults([])
        }
    }, [query])

    const suggestions = results.map((result, index) => <p onClick={(e) => {
        props.addIngredient(result.name)
        setQuery(result.name)
    }} style={{padding: '4px 0', border: '1px solid black', borderTop: '0', width: '255px', margin: 'auto'}} key={index}>{result.name}</p>)

    return(
        <div style={{position: 'relative', width: '258px', margin: '10px auto'}}>
            <input style={{width: '250px'}} onChange={(e) => setQuery(e.target.value)} value={query}/>
            <div style={{position: 'absolute', top: '25px', left: '0.4px', zIndex: 10, backgroundColor: 'white'}} onClick={(e) => e.target.parentNode.style = 'display: none'}>{suggestions ? suggestions : null}</div>
        </div>
    )
}

export default IngredientBar