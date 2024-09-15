import { useEffect, useState } from "react";
import Photograph from "./Photograph.js"

function Photographs() {
  const [photos, setPhotos] = useState([]);
  const [filterMode, setFilterMode] = useState('nofilter');

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
  
  const handleFilterTypeChange = (event) => {
    setFilterMode(event.target.value);
  };

  return (
    <section className="container">
      <select value={filterMode} onChange={handleFilterTypeChange}>
        <option value="nofilter">None</option>
        <option value="animal">Animal</option>
        <option value="location">Location</option>
      </select>
      <p>Selected: {filterMode}</p>

      {photos.map((photo) => (
        <Photograph key = {photo.id} animal = {photo.animal} image = {photo.image} location = {photo.location} datetime = {photo.datetime}/>
      ))}
    </section>
  );
}

export default Photographs;