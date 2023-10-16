import "./gardenPageStyle.css";
import { IoSunnyOutline, IoWaterOutline } from "react-icons/io5";
import { GardenData } from "../../data/gardenData";
import { useState } from "react";
import {auth, db} from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Button from "../../components/Button/button";
import ReactModal from 'react-modal'; 
import { getAuth } from 'firebase/auth';

const divStyle = {
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'center',
  backgroundSize: 'cover',
  width: 'fit-content',
  height: '500px'
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '400px',
    maxHeight: '400px',
    margin: 'auto',
  },
};
const GardenPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantType, setNewPlantType] = useState("type1");
  const [newCustomSensors, setNewCustomSensors] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePlant = async () => {
    const authUser = getAuth()
    const user = authUser.currentUser
    const newPlant = {
      name: newPlantName,
      type: newPlantType,
      customSensors: newCustomSensors,
    };
  
    try {
      const docRef = await addDoc(collection(db, 'plants'), newPlant);
  
      console.log("Plant added with ID: ", docRef.id);
  
      closeModal();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding document: " + error.message);
    }
  };
  return (
    <section>
      <h1>My Plants</h1>
      <Button onClick={openModal}>Add Plants</Button>
      <div className="slide-container">
          {GardenData.map((plant, index)=> (
                <div style={{ ...divStyle, 'backgroundImage': `url(${plant.url})` }}>
                  <span className="plant-sensor">
                    <IoSunnyOutline/>
                    <p>{plant.temp}</p>
                  </span>
                  <span className="plant-mood">
                    <h1>{plant.name}</h1>
                    <p>is</p>
                    {plant.caption}
                  </span>
                  <span className="plant-sensor">
                    <IoWaterOutline />
                    <p>{plant.moisture} %</p>
                  </span>
                </div>
            ))} 
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Plant Modal"
      >
        <p onClick={closeModal} className="close-modal">
          Close
        </p>
        <h2>Create a New Plant</h2>
        <form>
          <label htmlFor="plantName">Plant Name:</label>
          <input
            type="text"
            id="plantName"
            value={newPlantName}
            onChange={(e) => setNewPlantName(e.target.value)}
          />

          <label htmlFor="plantType">Plant Type:</label>
          <select
            id="plantType"
            value={newPlantType}
            onChange={(e) => setNewPlantType(e.target.value)}
          >
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>

          <label htmlFor="customSensors">Custom Sensors:</label>
          <input
            type="text"
            id="customSensors"
            placeholder="Enter sensor details"
            value={newCustomSensors}
            onChange={(e) => setNewCustomSensors(e.target.value)}
          />

          <Button onClick={handleCreatePlant}>Create Plant</Button>
        </form>
      </ReactModal>
    </section>
  );
}
;
export default GardenPage;