import {Link} from 'react-router-dom'

function Home(){
    return(
        <div>
            <h3>Welcome to our recipe search/save website. Here's a description of what we can do for you...</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to='/nameSearch'><button>Search a recipe by name</button></Link>
            </div>
        </div>
    )
}

export default Home