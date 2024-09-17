import React from "react";

const noImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shoshinsha-design.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fnoimage-760x460.png&f=1&nofb=1&ipt=d872ea62b4b151bf09b2fbf210849cba33aa79c637b5c2ce34dd1d2399081e1b&ipo=images'

function Location({location}) {
  return (
    <div className="photoCard">
      <h4>
        <p>{location.name}</p>
      </h4>
      {location.photographs.length ? <img src={location.photographs[0].image}/> : <img src={noImage}/>}
    </div>
  );
}

export default Location;