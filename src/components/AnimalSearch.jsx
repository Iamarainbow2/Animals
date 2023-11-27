
import React, { useState } from 'react';
import axios from 'axios';

const AnimalSearch = () => {
  const [animalId, setAnimalId] = useState('');
  const [searchedAnimal, setSearchedAnimal] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/animals/${animalId}`);
      setSearchedAnimal(response.data);
    } catch (error) {
      console.error('Error fetching animal by ID:', error);
      setSearchedAnimal(null);
    }
  };

  return (
    <div>
      <h2>Search Animal by ID</h2>
      <label>
        Animal ID:
        <input type="text" value={animalId} onChange={e => setAnimalId(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>
      {searchedAnimal && (
        <div>
          <h3>Result:</h3>
          <p>ID: {searchedAnimal.id}</p>
          <p>Name: {searchedAnimal.name}</p>
          <p>Age: {searchedAnimal.age}</p>
          <p>Vaccine: {searchedAnimal.vaccine}</p>
        </div>
      )}
    </div>
  );
};

export default AnimalSearch;
