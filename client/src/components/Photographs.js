import { useState, useEffect } from "react";
import Photograph from "./Photograph.js"

function Photographs({photos, animals, locations, handleDelete, editMode, setEditMode, confirmEdit}) {
  const [filterMode, setFilterMode] = useState('nofilter')
  const [filter, setFilter] = useState('nofilter')

  const handleFilterTypeChange = (e) => {
    setFilterMode(e.target.value)
    setFilter('nofilter')
  }
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filteredPhotos = photos.filter((photo) => 
    (filterMode === 'animal' && photo.animal.name === filter) ||
    (filterMode === 'location' && photo.location.name === filter) ||
    filterMode === 'nofilter' || filter === 'nofilter'
  )

  return (
    <div>
      <div className="filter">
        <select id = "filterMode" value={filterMode} onChange={(e) => handleFilterTypeChange(e)}>
          <option value="nofilter">None</option>
          <option value="animal">Animal</option>
          <option value="location">Location</option>
        </select>
        {filterMode === 'nofilter' ? (<></>) : (
          <div>
            <select id = "filter" value={filter} onChange={(e) => handleFilterChange(e)}>
              <option value="nofilter">None</option>
              {filterMode === 'animal' ? animals.map(animal => (
                <option key={animal.id} value={animal.name}>{animal.name}</option>
              )) : locations.map((location) => (
                <option key={location.id} value={location.name}>{location.name}</option>))}
            </select>
          </div>
        )}
      </div>
    
      <section className="container">
        {filteredPhotos.map((photo) => (
          <Photograph key = {photo.id} 
                      id = {photo.id} 
                      animal = {photo.animal} 
                      image = {photo.image} 
                      location = {photo.location} 
                      datetime = {photo.datetime}
                      handleDelete = {handleDelete} 
                      editMode = {editMode}
                      setEditMode = {setEditMode}
                      confirmEdit = {confirmEdit}
                      animals = {animals}
                      locations = {locations}
                      />
        ))}
      </section>
    </div>
  );
}

export default Photographs;