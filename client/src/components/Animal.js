import React from "react";

function Animal({name, photographs}) {
console.log(photographs)
  return (
    <div className="photoCard">
      <h4>Name: {name}</h4>
      <img src={photographs[0].image}/>
    </div>
  );
}

export default Animal;