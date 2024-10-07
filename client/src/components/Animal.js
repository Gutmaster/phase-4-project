import {useState} from "react";

const noImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shoshinsha-design.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fnoimage-760x460.png&f=1&nofb=1&ipt=d872ea62b4b151bf09b2fbf210849cba33aa79c637b5c2ce34dd1d2399081e1b&ipo=images'

function Animal({animal}) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [edit, setEdit] = useState(false)
  let prevEdit = edit
  const [description, setDescription] = useState(animal.description)

  function handleArrowRight(e) {
    e.preventDefault()
    setPhotoIndex((photoIndex + 1) % animal.photographs.length)
  }
  function handleArrowLeft(e) {
    e.preventDefault()
    setPhotoIndex((photoIndex - 1 + animal.photographs.length) % animal.photographs.length)
  }

  function handleEdit() {
    prevEdit = edit
    if (prevEdit)
    {
        animal.description = description
        fetch(`/animals/${animal.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: animal.name, description: description})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
    }
    setEdit(!prevEdit)
}
  return (
    <div className="photoCard">
      <h4>{animal.name}</h4>
      <span>
        <button onClick={handleArrowLeft}>&lt;</button>
        {animal.photographs.length ? <img src={animal.photographs[photoIndex].image} alt={animal.name}/> : <img src={noImage} alt='no_photo'/>}
        <button onClick={handleArrowRight}>&gt;</button>
      </span>
      {edit ? <textarea className='edit' rows="5" cols="69" value={description} onChange={(e) => setDescription(e.target.value)}/> : <p className='edit'>{description}</p>}
      <button onClick={() => handleEdit()}>{edit ? 'Save': 'Edit'}</button>
      <ul>
        {animal.locations.map(location => <li key = {location}>{location}</li>)}
      </ul>
    </div>
  );
}

export default Animal;