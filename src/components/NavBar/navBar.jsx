import "./navBar.css";
import { GiFlowerPot } from "react-icons/gi";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import Button from '../Button/button';
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from 'react'; 
import { IoLogOutOutline, IoNotificationsOutline  } from "react-icons/io5";

const NavBar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({}); 

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = () => {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    getDoc(userDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log('Fetched user data:', userData);
          setUserData(userData);
        } else {
          console.log('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout")){
        localStorage.clear();
        signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            console.error('Error during logout:', error);
        });
    }
  }

  return (
    <div className="navbar">
      <Link className='sidebar-logo' to="/home">
        <GiFlowerPot />
        <p>TerraTrend</p>
      </Link>
      <div className="profile">
        <Link to="/home/settings" className="username">
            <div className="username">{`${userData.firstName} ${userData.lastName}`}</div>
            <img src="https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1" className="profile-picture" alt="profile"/>
        </Link>
        <Link to="/home/alerts">
            <IoNotificationsOutline size={28}/>
        </Link>
        <Button variant="danger logout-btn" onClick={handleLogout}>
          <IoLogOutOutline size={15}/>
          <p>Logout</p>
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
