import React, { useState } from 'react';
import Button from '../../components/Button/button';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CreatePlantForm = ({ onPlantCreated }) => {
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantType, setNewPlantType] = useState('herbs');
  const [selectedSensor, setSelectedSensor] = useState('none'); 

  const handleCreatePlant = async (e) => {
    e.preventDefault();
    const authUser = getAuth();
    const user = authUser.currentUser;

    try {
      const docRef = await addDoc(collection(db, 'plants'), {
        plantName: newPlantName,
        plantType: newPlantType,
        customSensors: selectedSensor, 
        temp: 40,
        moisture: 40,
        caption: 'Happy',
        userID: user.uid,
      });

      onPlantCreated({
        id: docRef.id,
        plantName: newPlantName,
        plantType: newPlantType,
        customSensors: selectedSensor,
        temp: 40,
        moisture: 40,
        userID: user.uid,
      });

      alert('You have successfully added a new plant!');
      setNewPlantName('');
      setSelectedSensor('none'); 
    } catch (error) {
      alert('Error adding document: ' + error.message);
    }
  };

  const availableSensors = ['sensor 1',]; 

  return (
    <>
      <h2>Create a New Plant</h2>
      <form onSubmit={handleCreatePlant}>
        <label htmlFor="plantName">Plant Name:</label>
        <input
          type="text"
          id="plantName"
          value={newPlantName}
          placeholder="Enter a plant name"
          onChange={(e) => setNewPlantName(e.target.value)}
          required
        />

        <label htmlFor="plantType">Plant Type:</label>
        <select
          id="plantType"
          value={newPlantType}
          onChange={(e) => setNewPlantType(e.target.value)}
          required
        >
          <option value="herbs">Herbs</option>
          <option value="shrubs">Shrubs</option>
          <option value="climbers">Climbers</option>
        </select>

        <label htmlFor="customSensors">Available Sensor</label>
        <select
          id="customSensors"
          value={selectedSensor}
          onChange={(e) => setSelectedSensor(e.target.value)}
        >
          {availableSensors.map((sensor) => (
            <option key={sensor} value={sensor}>
              {sensor}
            </option>
          ))}
        </select>

        <Button type="submit" variant="primary full">
          Create Plant
        </Button>
      </form>
    </>
  );
};

export default CreatePlantForm;
