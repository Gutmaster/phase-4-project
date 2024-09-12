import { useEffect, useState } from "react";
import Animal from "./Animal.js"

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("/animals")
      .then((r) => r.json())
      .then(json => setAnimals(json));
  }, []);

  function handleDelete(id) {
    fetch(`/animals/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setAnimals((animals) =>
          animals.filter((animal) => animal.id !== id)
        );
      }
    });
  }

  return (
    <section className="container">
      {animals.map((animal) => (
        <div key = {animal.id}>
            <Animal name = {animal.name} photographs = {animal.photographs}/>
            <button onClick={() => handleDelete(animal.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default Animals;