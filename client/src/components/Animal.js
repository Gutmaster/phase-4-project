import {useState} from "react";

const noImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shoshinsha-design.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fnoimage-760x460.png&f=1&nofb=1&ipt=d872ea62b4b151bf09b2fbf210849cba33aa79c637b5c2ce34dd1d2399081e1b&ipo=images'

function Animal({animal}) {
  const [photoIndex, setPhotoIndex] = useState(0)

  function handleArrowRight(e) {
    e.preventDefault()
    setPhotoIndex((photoIndex + 1) % animal.photographs.length)
  }
  function handleArrowLeft(e) {
    e.preventDefault()
    setPhotoIndex((photoIndex - 1 + animal.photographs.length) % animal.photographs.length)
  }

  return (
    <div className="photoCard">
      <h4>
        <p>{animal.name}</p>
      </h4>
      <span>
        <button onClick={handleArrowLeft}>&lt;</button>
        {animal.photographs.length ? <img src={animal.photographs[photoIndex].image}/> : <img src={noImage}/>}
        <button onClick={handleArrowRight}>&gt;</button>
      </span>
      <p>{animal.description}</p>
    </div>
  );
}

export default Animal;