import Animal from "./Animal.js"

function Animals({animals}) {
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