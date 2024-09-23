import React, { useEffect, useState } from "react";
import Home from "./Home.js"
import Navbar from "./NavBar.js";
import Photographs from "./Photographs.js"
import Animals from "./Animals.js"
import Locations from "./Locations.js"
import NewPhoto from "./NewPhoto.js"
import { Switch, Route } from "react-router-dom";

function App() {
  const [animals, setAnimals] = useState([])
  const [locations, setLocations] = useState([])
  const [photos, setPhotos] = useState([])

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

  function handleDeletePhoto(id) {
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
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/animals">
          <Animals animals={animals}/>
        </Route>
        <Route exact path="/locations">
          <Locations locations={locations}/>
        </Route>
        <Route exact path="/photographs">
          <Photographs photos={photos} animals={animals} locations={locations} handleDelete={handleDeletePhoto}/>
        </Route>
        <Route exact path="/newphoto">
          <NewPhoto animals={animals} locations={locations}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
