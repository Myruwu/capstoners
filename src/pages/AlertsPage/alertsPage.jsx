import React, { useEffect, useState } from "react";
import "./alertsPageStyle.css";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";


const AlertsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsCollectionRef = collection(db, "notifications");
      const querySnapshot = await getDocs(notificationsCollectionRef);
      const notificationsData = [];
      querySnapshot.forEach((doc) => {
        const notification = doc.data();
        notification.datetime = formatTimestamp(notification.datetime);
        notificationsData.push(notification);
      });
      setNotifications(notificationsData);
    };

    fetchNotifications();
  }, []);
  
  return (
    <section>
      {notifications.map((notification, index) => (
        <div className="notification-card" key={index}>
          <h2>{notification.title}</h2>
          <p>{notification.message}</p>
          <p className="datetime">{notification.datetime}</p>
        </div>
      ))}
  </section>
  );
};

export default AlertsPage;
