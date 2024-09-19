import { Link } from "react-router-dom";

function Home() {
    return (
      <div>
        <h1>Welcome to The Creature Society!</h1>
        <p>
          This is a website dedicated to showcasing the incredible creatures we've come across in our world.
        </p>
        <p>
          <Link to="/photographs">View our photographs</Link> or
          <Link to="/animals"> explore our animals</Link>.
        </p>
      </div>
    );
}

export default Home;