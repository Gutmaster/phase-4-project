import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const noImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shoshinsha-design.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fnoimage-760x460.png&f=1&nofb=1&ipt=d872ea62b4b151bf09b2fbf210849cba33aa79c637b5c2ce34dd1d2399081e1b&ipo=images'

function Animal({animal}) {
  const [photoIndex, setPhotoIndex] = useState(0)



  return (
    <div className="photoCard">
      <h4>
        {/* <Link to={`/animals/${animal.id}`}> Name: {animal.name}</Link> */}
        <p>{animal.name}</p>
      </h4>
      {animal.photographs.length ? <img src={animal.photographs[0].image}/> : <img src={noImage}/>}
      
      <p>{animal.description}</p>
    </div>
  );
}

export default Animal;