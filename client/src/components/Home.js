import { useEffect, useState } from "react";
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
//   const [species, setSpecies] = useState([]);

//   useEffect(() => {
//     fetch("/animals")
//       .then((r) => r.json())
//       .then(setSpecies);
//   }, []);

//   function handleDelete(id) {
//     fetch(`/animals/${id}`, {
//       method: "DELETE",
//     }).then((r) => {
//       if (r.ok) {
//         setSpecies((species) =>
//           species.filter((specie) => specie.ID !== id)
//         );
//       }
//     });
//   }

//   return (
//     <section className="container">
//       {species.map((specie) => (
//         <div key={specie.id} className="card">
//           <h2>{specie.Name}
//             <Link to={`/animals/${specie.id}`}>{specie.name}</Link>
//           </h2>
//           <button onClick={() => handleDelete(specie.ID)}>Delete</button>
//         </div>
//       ))}
//     </section>
//   );
// }

export default Home;