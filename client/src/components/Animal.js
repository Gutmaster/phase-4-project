import React from "react";
import { Link } from "react-router-dom";

function Animal({animal}) {
  return (
    <div className="photoCard">
      <h4>
        <Link to={`/animals/${animal.id}`}> Name: {animal.name}</Link>
      </h4>
      <img src={animal.photographs[0].image}/>
    </div>
  );
}

export default Animal;