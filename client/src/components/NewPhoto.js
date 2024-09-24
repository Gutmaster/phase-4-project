import React, {useState} from "react";

function NewPhoto({animals, locations, photos, setPhotos}) {
    const [animal, setAnimal] = useState('Select')
    const [location, setLocation] = useState('Select')
    const [image, setImage] = useState('')

    function onSubmit(event) {
        event.preventDefault();
        const formData = {
            animal_id: animal,
            location_id: location,
            image: image
        }
        console.log("POSTING PHOTOGRAPH", formData)
        fetch('/photographs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                animal_id: animal,
                location_id: location,
                image: image
             })
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
                    <option value={'Select'}>Select Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>{animal.name}</option>
                    ))}
                </select>
                <br />
            <label htmlFor='location'>Location: </label>
                <select id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value={'Select'}>Select Location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                </select>
                <br />
            <label htmlFor='image'>Image URL: </label>
                <input type="text" id = "image" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                <br />
            <button type="submit" className='submitButton'>Submit</button>
        </form>
    );
}

export default NewPhoto;