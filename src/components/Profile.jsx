import { useEffect, useState } from "react"

function Profile(props){
    let [user, setUser] = useState(props.account)

    useEffect(() => {
        // fetch(`https://quiet-plains-41541.herokuapp.com/users/${}`)
        fetch(`http://localhost:4000/users/${user.id}`)
        .then(res => res.text())
        .then(res => console.log(res))
    }, [user])

    return(
        <div>
            <h2>Profile</h2>
        </div>
    )
}

export default Profile