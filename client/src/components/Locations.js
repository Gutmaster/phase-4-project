import Location from "./Location.js"

function Locations({locations}) {
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