import React from "react";
import { Link } from "react-router-dom";

function Location({location}) {
  return (
    <div className="photoCard">
      <h4>
        <Link to={`/location/${location.id}`}> Name: {location.name}</Link>
      </h4>
      <img src={location.photographs[0].image}/>
    </div>
  );
}

export default Location;