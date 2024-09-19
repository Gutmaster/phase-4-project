import React from "react";

function Photograph({id, animal, location, datetime, image, handleDelete}) {
  return (
    <div className="photoCard">
      <h4>Name: {animal.name}</h4>
      <img src={image} alt={animal.name}/>
      <h4>Location: {location.name}</h4>
      <h5>Date: {datetime}</h5>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default Photograph;