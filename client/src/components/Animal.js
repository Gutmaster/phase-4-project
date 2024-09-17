import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Animal({animal}) {
  const [photoIndex, setPhotoIndex] = useState(0)


  return (
    <div className="photoCard">
      <h4>
        {/* <Link to={`/animals/${animal.id}`}> Name: {animal.name}</Link> */}
        <p>{animal.name}</p>
      </h4>
      <img src={animal.photographs[0].image}/>
      <p>{animal.description}</p>
    </div>
  );
}

export default Animal;