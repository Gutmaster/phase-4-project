import React from "react";

function Photograph({animal, location, datetime, image}) {
  return (
    <div className="photoCard">
      <h4>Name: {animal}</h4>
      <img src={image}/>
      <h4>Location: {location}</h4>
      <h5>Date: {datetime}</h5>
    </div>
  );
}

export default Photograph;