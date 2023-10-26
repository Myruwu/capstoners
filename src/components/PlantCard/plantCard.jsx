import { useEffect, useState } from 'react';
import { IoSunnyOutline, IoWaterOutline } from 'react-icons/io5';
import Happy from '../../assets/plants/herbs.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";
import Button from '../Button/button';
import { db } from '../../config/firebase';
import { getDatabase,ref, get } from 'firebase/database';
import { collection, addDoc } from 'firebase/firestore';

const getPlantMood = (temperature, moistureLvl) => {
  if (temperature >= 25 && moistureLvl >= 50) {
    return 'Happy';
  } else if (temperature < 25 && moistureLvl < 50) {
    return 'Sad';
  } else {
    return 'Okay';
  }
};

const PlantCard = ({ plant, onOpenUpdateModal, onDeletePlant }) => {
  const [moistureLvl, setMoistureLvl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const moistureRef = ref(database, 'plant/sensor1/moistureLvl');
      try {
        const snapshot = await get(moistureRef);
        if (snapshot.exists()) {
          const moistureLevel = snapshot.val();
          setMoistureLvl(moistureLevel);
        } else {
          console.log('No data available for moisture level.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const notificationInterval = setInterval(() => {
      sendNotification(plant.plantName,getPlantMood(plant.temp, moistureLvl));
    }, 3600000);

    return () => clearInterval(notificationInterval);
  }, []);

  const sendNotification = (name,mood) => {
    if (mood === 'Happy') {
      toast.success('Your plant is happy!', {
        position: 'top-right',
        autoClose: 3000,
      });
      sendEmail(mood);
    } else if (mood === 'Sad') {
      toast.error('Your plant is sad!', {
        position: 'top-right',
        autoClose: 3000,
      });
      sendEmail(mood);
    } else {
      toast.info('Your plant is okay.', {
        position: 'top-right',
        autoClose: 3000,
      });
      sendNotificationDb(plant.plantName, mood);
      sendEmail(name,mood);
    }
  };

  
  const sendEmail = (name,mood) => {
    emailjs.send('service_lol22d9', 'template_767fs4o', {
      from_name: 'Terra Trend',
      user_email: 'terratrend@gmail.com',
      message: `Your ${name} is ${mood}`,
    }, 'vtXLr4r1SnXfOFrHj').then(
      function (response) {
        alert('Email sent:', response);
      },
      function (error) {
        alert('Email failed to send:', error);
      }
    );
  };

  const sendNotificationDb = async (name, mood) => {
    const timestamp = new Date().getTime();
    const notificationsCollectionRef = collection(db, 'notifications');
    
    try {
      const newNotificationDocRef = await addDoc(notificationsCollectionRef, {
        title: "Plant Update",
        message: `Your ${name} is ${mood}`,
        datetime: timestamp,
      });
      alert("Notification written with ID: ", newNotificationDocRef.id);
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  };
  
  return (
    <div className="plant-card">
      <img src={Happy} alt="plant" className="plant-img" />
      <div className='content-container'>
        <div className="plant-sensor">
          <span>
            <IoSunnyOutline />
            <p>{plant.temp}</p>
          </span>
          <span>
            <IoWaterOutline />
            <p>{moistureLvl}</p>
          </span>
        </div>
        <span className="plant-mood">
          <h1>{plant.plantName}</h1>
          <p>is</p>
          <span className={getPlantMood(plant.temp, moistureLvl).toLowerCase()}>{getPlantMood(plant.temp, moistureLvl)}</span>
        </span>
        <p className='plant-type'>Type: {plant.plantType}</p>
        <div className="button-container">
          <Button variant="warning" onClick={() => onOpenUpdateModal(plant)}>
            Update
          </Button>
          <Button variant="danger" onClick={() => onDeletePlant(plant.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
