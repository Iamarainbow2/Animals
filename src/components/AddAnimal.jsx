
import React, { useState } from 'react';
import axios from 'axios';

const AddAnimal = () => {
  const [newAnimal, setNewAnimal] = useState({ name: '', age: '', vaccine: '' });

  const handleAddAnimal = async () => {
    try {
      await axios.post('http://localhost:3001/api/animals', newAnimal);
      // Clear the form after successful addition
      setNewAnimal({ name: '', age: '', vaccine: '' });
    } catch (error) {
      console.error('Error adding new animal:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Animal</h2>
      <label>
        Name:
        <input type="text" value={newAnimal.name} onChange={e => setNewAnimal({ ...newAnimal, name: e.target.value })} />
      </label>
      <label>
        Age:
        <input type="text" value={newAnimal.age} onChange={e => setNewAnimal({ ...newAnimal, age: e.target.value })} />
      </label>
      <label>
        Vaccine:
        <input type="text" value={newAnimal.vaccine} onChange={e => setNewAnimal({ ...newAnimal, vaccine: e.target.value })} />
      </label>
      <button onClick={handleAddAnimal}>Add Animal</button>
    </div>
  );
};

export default AddAnimal;
