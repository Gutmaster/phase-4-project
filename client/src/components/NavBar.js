import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
    <h1>The Creature Society</h1>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/photographs">Photographs </Link>
        <Link to="/animals">Animals</Link>
      </nav>
    </header>
  );
}

export default Navbar;