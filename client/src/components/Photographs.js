import { useEffect, useState } from "react";
import Photograph from "./Photograph.js"

function Photographs() {
  const [photos, setPhotos] = useState([]);

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

  return (
    <section className="container">
      {photos.map((photo) => (
        <Photograph animal = {photo.animal} image = {photo.image} location = {photo.location} datetime = {photo.datetime}/>
      ))}
    </section>
  );
}

export default Photographs;