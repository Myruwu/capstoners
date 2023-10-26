import "./dashboardPageStyle.css";
// DashboardPage.js
import React, { useState, useEffect } from 'react';
import PlantCard from '../../components/PlantCard/plantCard';
import UpdatePlantModal from '../../components/UpdatePlantModal/updatePlantModal';
import CreatePlantForm from '../../components/CreatePlantForm/createPlantForm';
import { db } from '../../config/firebase';
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const ITEMS_PER_PAGE = 6; // Change the number of items per page here

const DashboardPage = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const plantCollection = collection(db, 'plants');
      const plantQuery = query(plantCollection);
      const plantSnapshot = await getDocs(plantQuery);

      const plantList = [];
      plantSnapshot.forEach((doc) => {
        plantList.push({ id: doc.id, ...doc.data() });
      });

      setPlants(plantList);
    };

    fetchData();
  }, []);

  const handleDeletePlant = async (id) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await deleteDoc(doc(db, 'plants', id));
        alert('Plant deleted successfully!');
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      } catch (error) {
        console.error('Error deleting plant: ', error);
        alert('Error deleting plant: ' + error.message);
      }
    }
  };

  const handleOpenUpdateModal = (plant) => {
    setSelectedPlant(plant);
  };

  const handleCloseUpdateModal = () => {
    setSelectedPlant(null);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedPlants = plants.slice(startIndex, endIndex);

  const showPagination = plants.length > ITEMS_PER_PAGE;

  const updatePlantsArray = (updatedPlant) => {
    const updatedPlants = [...plants];
    const index = updatedPlants.findIndex((plant) => plant.id === updatedPlant.id);
    if (index !== -1) {
      updatedPlants[index] = updatedPlant;
    }
    setPlants(updatedPlants);
  };

  return (
    <section className="garden-page">
      <div className="form-container">
        <CreatePlantForm onPlantCreated={(newPlant) => setPlants([...plants, newPlant])} />
      </div>
      <div className="plant-container">
        <div className="slide-container">
          {displayedPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onOpenUpdateModal={handleOpenUpdateModal}
              onDeletePlant={handleDeletePlant}
            />
          ))}
        </div>
        {showPagination && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= plants.length}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
      {selectedPlant && (
        <UpdatePlantModal
          selectedPlant={selectedPlant}
          onCloseUpdateModal={handleCloseUpdateModal}
          onPlantUpdated={updatePlantsArray}
        />
      )}
    </section>
  );
};

export default DashboardPage;
