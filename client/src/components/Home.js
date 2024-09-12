import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch("/animals")
      .then((r) => r.json())
      .then(setSpecies);
  }, []);

  function handleDelete(id) {
    fetch(`/animals/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setSpecies((species) =>
          species.filter((specie) => specie.ID !== id)
        );
      }
    });
  }

  return (
    <section className="container">
      {species.map((specie) => (
        <div key={specie.ID} className="card">
          <h2>{specie.Name}
            <Link to={`/animals/${specie.ID}`}>{specie.name}</Link>
          </h2>
          <button onClick={() => handleDelete(specie.ID)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default Home;