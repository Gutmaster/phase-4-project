import { useEffect, useState } from "react";
import Animal from "./Animal.js"

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("/animals")
      .then((r) => r.json())
      .then(json => setAnimals(json));
  }, []);

  return (
    <section className="container">
      {animals.map((animal) => (
        <div key = {animal.id}>
            <Animal animal = {animal}/>
        </div>
      ))}
    </section>
  );
}

export default Animals;