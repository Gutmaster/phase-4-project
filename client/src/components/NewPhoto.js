import React from "react";

function NewPhoto({animals, locations}) {
    return (
        <form className='newPhotoForm'>
            <label>Animal: </label>
                <select>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>{animal.name}</option>
                    ))}
                </select>
                <br />
            <label>Location: </label>
                <select>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                </select>
                <br />
            <label>Image URL: </label>
                <input type="text" name="image"/>
                <br />
            <label>Description: </label>
                <textarea name="description" rows="4" cols="50"/>
                <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewPhoto;