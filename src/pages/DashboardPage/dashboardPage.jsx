import React, { useState, useEffect } from "react";
import "./dashboardPageStyle.css";
import happy from '../../assets/plants/happy.png'
// Plant data
const plants = [
  {
    id: 1,
    name: "Plant 1",
    image: happy,
    hydrationLevel: 60,
  },
  {
    id: 2,
    name: "Plant 2",
    image: happy,
    hydrationLevel: 45,
  },
  // Add more plant data here
];

const Plant = ({ name, image, hydrationLevel }) => {
  return (
    <div className="plant-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Hydration Level: {hydrationLevel}%</p>
    </div>
  );
};

const DashboardPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousPlant = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : plants.length - 1));
  };

  const goToNextPlant = () => {
    setCurrentIndex((prevIndex) => (prevIndex < plants.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="carousel-container">
        <button onClick={goToPreviousPlant} className="nav-button">
          &lt; Previous
        </button>
        <Plant {...plants[currentIndex]} />
        <button onClick={goToNextPlant} className="nav-button">
          Next &gt;
        </button>
      </div>
    </section>
  );
};

export default DashboardPage;