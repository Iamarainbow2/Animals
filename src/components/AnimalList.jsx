import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/animals');
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  const handleDeleteAnimal = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/animals/${id}`);
      fetchAnimals();
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  return (
    <div>
      <h2>Animals to Adopt</h2>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            {animal.name} - {animal.age} years old - {animal.vaccine ? 'Vaccinated' : 'Not Vaccinated'}
            <button onClick={() => handleDeleteAnimal(animal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalList;
