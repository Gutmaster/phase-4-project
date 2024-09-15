import { useEffect, useState } from "react";
import Photograph from "./Photograph.js"

function Photographs() {
  const [photos, setPhotos] = useState([])
  const [filterMode, setFilterMode] = useState('nofilter')
  const [filter, setFilter] = useState('nofilter')
  const [animals, setAnimals] = useState([]);
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetch("/animals")
      .then((r) => r.json())
      .then(json => setAnimals(json));
  }, []);

  useEffect(() => {
    fetch("/locations")
     .then((r) => r.json())
     .then(json => setLocations(json));
  }, []);
  
  useEffect(() => {
    fetch("/photographs")
      .then((r) => r.json())
      .then(setPhotos);
  }, []);

  function handleDelete(id) {
    fetch(`/photographs/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setPhotos((photos) =>
          photos.filter((photo) => photo.id !== id)
        );
      }
    });
  }
  
  const handleFilterTypeChange = (event) => setFilterMode(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filteredPhotos = photos.filter((photo) => 
    (filterMode === 'animal' && photo.animal.name === filter) ||
    (filterMode === 'location' && photo.location.name === filter) ||
    filterMode === 'nofilter' || filter === 'nofilter'
  )

  return (
    <section className="container">
      <select value={filterMode} onChange={handleFilterTypeChange}>
        <option value="nofilter">None</option>
        <option value="animal">Animal</option>
        <option value="location">Location</option>
      </select>

      {filterMode === 'nofilter' ? (<></>) : (
        <div>
          <select value={filter} onChange={handleFilterChange}>
            <option value="nofilter">None</option>
            {filterMode === 'animal' ? animals.map(animal => (
              <option key={animal.id} value={animal.name}>{animal.name}</option>
            )) : locations.map((location) => (
              <option key={location.id} value={location.name}>{location.name}</option>))}
          </select>
        </div>
      )}
      
      {filteredPhotos.map((photo) => (
        <Photograph key = {photo.id} animal = {photo.animal} image = {photo.image} location = {photo.location} datetime = {photo.datetime}/>
      ))}
    </section>
  );
}

export default Photographs;