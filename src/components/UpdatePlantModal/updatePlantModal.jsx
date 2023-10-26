// UpdatePlantModal.js
import React, { useState } from 'react';
import Button from '../../components/Button/button';
import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const UpdatePlantModal = ({ selectedPlant, onCloseUpdateModal, onPlantUpdated }) => {
  const [updatePlantName, setUpdatePlantName] = useState(selectedPlant.plantName);
  const [updateCustomSensors, setUpdateCustomSensors] = useState(selectedPlant.customSensors);

  const handleUpdatePlant = async (e) => {
    e.preventDefault();

    if (selectedPlant) {
      try {
        const plantRef = doc(db, 'plants', selectedPlant.id);
        const updatedFields = {
          plantName: updatePlantName,
          customSensors: updateCustomSensors,
        };
        await updateDoc(plantRef, updatedFields);

        const updatedPlant = {
          ...selectedPlant,
          plantName: updatePlantName,
          customSensors: updateCustomSensors,
        };

        onPlantUpdated(updatedPlant); // Call the callback function to update the plants array
        onCloseUpdateModal();
      } catch (error) {
        console.error('Error updating plant: ', error);
        alert('Error updating plant: ' + error.message);
      }
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Update Plant</h2>
        <form onSubmit={handleUpdatePlant}>
          <label htmlFor="updatePlantName">Plant Name:</label>
          <input
            type="text"
            id="updatePlantName"
            value={updatePlantName}
            onChange={(e) => setUpdatePlantName(e.target.value)}
          />
          <label htmlFor="updateCustomSensors">Custom Sensors:</label>
          <input
            type="text"
            id="updateCustomSensors"
            value={updateCustomSensors}
            onChange={(e) => setUpdateCustomSensors(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Update Plant
          </Button>
          <Button variant="secondary" onClick={onCloseUpdateModal}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlantModal;
