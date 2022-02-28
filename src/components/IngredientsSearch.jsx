import {useState} from 'react'
import IngredientBar from './IngredientBar'
import "./styles/ingredients-search.css"

function IngredientsSearch() {
    let [ingredients, setIngredients] = useState([])
    let [searchBars, setBars] = useState([0])
    let [results, updateResults] = useState([])

    const addIngredient = (ingredient) => {
        setIngredients([...ingredients, ingredient])
    }

    const searchForRecipe = () => {
        if(ingredients){
            fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(res => updateResults(res))
        }
    }

    const searchElems = searchBars.map((num, index) => {
        if(index !== searchBars.length - 1){
            return (
                <div key={index}>
                    <IngredientBar addIngredient={addIngredient} id={index} />
                </div>
            )
        } else {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '21px', width: '278px', margin:'auto', height: '24px'}} key={index}>
                    <IngredientBar addIngredient={addIngredient} id={index}/>
                    <span style={{alignSelf: 'start', marginLeft: '10px'}} onClick={() => setBars([...searchBars, searchBars.length])}>+</span>
                </div>
            )
        }
    })

    const searchResults = results.map((res, index) => <p key={index}>{res.title}</p>)

    return(
        <div>
            {searchElems}
            <button onClick={() => searchForRecipe()}>Search</button>
            <div>{searchResults ? searchResults : null}</div>
        </div>
    )
}

export default IngredientsSearch