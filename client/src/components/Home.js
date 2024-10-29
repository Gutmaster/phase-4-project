import { Link } from "react-router-dom";

function Home() {
    return (
      <div className='home'>
        <div className='homeText'>
          <h1>Welcome to the animal documenter!</h1>
          <p>
            This is a website dedicated to showcasing the incredible creatures people have come across in our world. 
            Our collection is made entirely of donated links to photographs taken of an given animal at a given place.
            You can look at our <Link to="/animals">animals</Link> and their locations, <Link to="/locations">locations</Link> and their animals, or all of our <Link to="/photographs">photographs</Link>, sorting as you please.
            If you'd like to enhance our collection with one of your own additions, head on over to the <Link to="/newphoto">new photo</Link> page!
          </p>
        </div>
      </div>
    );
}

export default Home;