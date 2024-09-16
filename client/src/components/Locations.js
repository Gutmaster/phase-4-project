import { useEffect, useState } from "react";
import Location from "./Location.js"

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/locations")
      .then((r) => r.json())
      .then(json => setLocations(json));
  }, []);

  return (
    <section className="container">
      {locations.map((location) => (
        <div key = {location.id}>
            <Location location = {location}/>
        </div>
      ))}
    </section>
  );
}

export default Locations;