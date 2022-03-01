import { useEffect, useState } from "react";
import './styles/card.css';

function RecipeCard(props){
    let [data, setData] = useState({})
    let [cardVis, setVis] = useState('initial')
    let [addVis, setAddVis] = useState('initial')

    const deleteFavorite = () => {
        fetch(`https://quiet-plains-41541.herokuapp.com/users/favorites/${props.mongoId}`,{
            method: 'DELETE'
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const addFavorite = () => {
        if(props.userId){
            fetch(`https://quiet-plains-41541.herokuapp.com/users/${props.userId}/favorite`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: props.name,
                recipeId: props.id
            })
        })
        }
    }

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${props.id}/information`)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => {
            console.log(err)
            setVis('none')
        })
    }, [])

    let addButton = (
        <span style={{display: addVis}} className="add-button" onClick={() => {
            addFavorite()
            setAddVis('none')
        }}>+</span>
    )

    return(
        <div className="card" style={{display: cardVis}}>
            <h2>{data.title}</h2>
            <h3>Ready in {data.readyInMinutes} minutes</h3>
            <span onClick={() => {
                setVis('none')
                deleteFavorite()
            }} className="close-button">X</span>
            {props.add ? addButton : null}
            <img alt={data.title} src={data.image}/>
            <p dangerouslySetInnerHTML={{ __html: data.summary }}/>
            <div style={{textAlign: 'center', marginTop: '10px', fontSize: '2rem'}}>{props.used}</div>
        </div>
    )
}

export default RecipeCard