import React, {useState} from "react";

function NewPhoto({animals, locations, photos, setPhotos}) {
    const [animal, setAnimal] = useState('select')
    const [location, setLocation] = useState('select')
    const [image, setImage] = useState('')
    const [newAnimal, setNewAnimal] = useState('')
    const [newLocation, setNewLocation] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    function alertReset(){
        setAlertMessage('')
    }

    async function onSubmit(event) {
        console.log('SUBMITTING')
        event.preventDefault();
        const formData = {
            animal_name: animal == 'newAnimal' ? newAnimal : animal,
            location_name: location == 'newLocation' ? newLocation : location,
            image: image
        }
        try {
            const response = await fetch('/photographs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                // This block will catch non-200-level HTTP responses
                const errorData = await response.json()
                console.error('Validation error:', errorData)
                return
            }
            const data = await response.json()
            setPhotos([...photos, data])
            setAnimal('select')
            setLocation('select')
            setImage('')
            setAlertMessage('Photo added!')
            setTimeout(alertReset, 2000)
        } catch (error) {
            // This block will catch network errors and other unexpected issues
            console.error('Network Error or unexpected issue:', error)
        }
    }

    return (
        <div>
            <form className='newPhotoForm' onSubmit={onSubmit}>
                <div className='left'>
                    <label htmlFor='animal'>Animal: </label>
                        <select id="animal" name="animal" value={animal} onChange={(e) => setAnimal(e.target.value)}>
                            <option value={'select'}>Select Animal</option>
                            {animals.map((animal) => (
                                <option key={animal.id} value={animal.name}>{animal.name}</option>
                            ))}
                            <option value={'newAnimal'}>New Animal</option>
                        </select>

                    <label htmlFor='location'>Location: </label>
                        <select id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value={'select'}>Select Location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.name}>{location.name}</option>
                            ))}
                            <option value={'newLocation'}>New Location</option>
                        </select>

                    <label htmlFor='image'>Image URL: </label>
                        <input type="text" id = "image" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div className='right'>
                    {animal === 'newAnimal' ? <input type="text" id = "newAnimal" name="newAnimal" value={newAnimal} onChange={(e) => setNewAnimal(e.target.value)}/> : <input type="text" readOnly={true} value={''} style = {{visibility: 'hidden'}}/>}
                    {location === 'newLocation' ? <input type="text" id = "newLocation" name="newLocation" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/> : <input type="text" readOnly={true} value={''} style = {{visibility: 'hidden'}}/>}
                </div>  
                <button type="submit" className='submitButton'>Submit</button>
            </form>
            {alertMessage!==''? <p className='goodAlert'>{alertMessage}</p>: <></>}
        </div>
    );
}

export default NewPhoto;