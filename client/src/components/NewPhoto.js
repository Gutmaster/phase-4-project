import React, {useState} from "react";

function NewPhoto({animals, locations, photos, setPhotos}) {
    const [animal, setAnimal] = useState('select')
    const [location, setLocation] = useState('select')
    const [image, setImage] = useState('')
    const [newAnimal, setNewAnimal] = useState('')
    const [newLocation, setNewLocation] = useState('')

    function onSubmit(event) {
        event.preventDefault();
        const formData = {
            animal_name: animal == 'newAnimal' ? newAnimal : animal,
            location_name: location == 'newLocation' ? newLocation : location,
            image: image
        }
        console.log("POSTING PHOTOGRAPH", formData)
        fetch('/photographs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                setPhotos([...photos, data])
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <form className='newPhotoForm' onSubmit={onSubmit}>
            <label htmlFor='animal'>Animal: </label>
                <select id="animal" name="animal" value={animal} onChange={(e) => setAnimal(e.target.value)}>
                    <option value={'select'}>Select Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.name}>{animal.name}</option>
                    ))}
                    <option value={'newAnimal'}>New Animal</option>
                </select>
                {animal === 'newAnimal' ? <input type="text" id = "newAnimal" name="newAnimal" value={newAnimal} onChange={(e) => setNewAnimal(e.target.value)}/> : <></>}
                <br />
            <label htmlFor='location'>Location: </label>
                <select id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value={'select'}>Select Location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.name}>{location.name}</option>
                    ))}
                    <option value={'newLocation'}>New Location</option>
                </select>
                {location === 'newLocation' ? <input type="text" id = "newLocation" name="newLocation" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/> : <></>}
                <br />
            <label htmlFor='image'>Image URL: </label>
                <input type="text" id = "image" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                <br />
            <button type="submit" className='submitButton'>Submit</button>
        </form>
    );
}

export default NewPhoto;