import {useState, useEffect} from 'react'

function RecipeSummary() {
    let [input, updateInput] = useState(1)
    let [response, updateRes] = useState({})

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${input}/summary?apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(res => updateRes(res))
    }, [input])

    return(
        <div>
            <h2>Summary of:</h2>
            <input onChange={(e) => updateInput(e.target.value)} type='number' />
            <p>Id: {response.id}</p>
            <p dangerouslySetInnerHTML={{__html: response.summary}} />
            <p>Title: {response.title}</p>
        </div>
    )
}
export default RecipeSummary