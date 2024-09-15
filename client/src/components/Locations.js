import { useEffect, useState } from "react";
import Location from "./Location.js"

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/locations")
      .then((r) => r.json())
      .then(json => setLocations(json));
  }, []);

  function handleDelete(id) {
    fetch(`/locations/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setLocations((locations) =>
          locations.filter((location) => location.id !== id)
        );
      }
    });
  }

  return (
    <section className="container">
      {locations.map((location) => (
        <div key = {location.id}>
            <Location location = {location}/>
            <button onClick={() => handleDelete(location.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default Locations;