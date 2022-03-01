import { useEffect, useState } from "react"
import './styles/profile.css';

import RecipeCard from "./RecipeCard";

function Profile(props){
    let [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetch(`https://quiet-plains-41541.herokuapp.com/users/${props.account.id}`)
        .then(res => res.json())
        .then(res => setFavorites([...favorites, ...res.user.favorites]))
    }, [])

    const favoriteCards = favorites.map((favId, i) => {
        return(
            <RecipeCard id={favId.recipeId} key={i} mongoId={favId._id}/>
        )
    })

    return(
        <div>
            <h1 style={{margin: '15px auto'}}>Welcome to your profile, {props.account.username}</h1>
            <h2 style={{margin: '10px auto'}}>Favorites</h2>
            <div className="favorites">
                {favoriteCards}
            </div>
        </div>
    )
}

export default Profile