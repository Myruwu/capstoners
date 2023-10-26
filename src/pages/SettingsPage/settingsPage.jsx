import "./settingsPageStyle.css";
import { useState, useEffect } from 'react';
import Button from "../../components/Button/button";
import { auth, db } from "../../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth,  updatePassword } from 'firebase/auth';

const SettingsPage = () => {
  const authUser = getAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  useEffect(() => {
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              console.log('Fetched user data:', userData);
              setUserFirstName(userData.firstName);
              setUserLastName(userData.lastName);
            } else {
              console.log('User document does not exist.');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        console.log('User is not authenticated.');
      }
    });
  }, [authUser]);


  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {

        updatePassword(auth.currentUser, newPassword) 
          .then(() => {
            alert("You have successfully updated your password!");
          })
          .catch((error) => {
            console.error(error);
          });
      
    }
  };
  const handleUpdateInfo = () => {
    if (firstName !== userFirstName || lastName !== userLastName) {
      const userDocRef = doc(db, 'users', authUser.currentUser.uid);
      const userData = {
        firstName: firstName,
        lastName: lastName,
      };
  
      setDoc(userDocRef, userData)
        .then(() => {
          alert("You have successfully updated your personal information!");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Personal information remains unchanged.");
    }
  };
  
  
  return (
    <section className="Settings">
      <h2>Account Settings</h2>
      <h4>
        {userFirstName} {userLastName}
      </h4>
      {authUser.currentUser.email ? authUser.currentUser.email : "Failed to get your email"}
      <div className="update-settings">
      <form>
      <h3>Change Personal Information</h3>

      <input
        type="text"
        placeholder="Change your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Change your last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button 
        type="button" 
        variant="primary"
        onClick={handleUpdateInfo}>
          Change Personal Info
      </Button>
      </form>
  
      <form>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button 
          type="button"
          variant="primary full"
          onClick={handleUpdatePassword}>
          Change Password
        </Button>
      </form>
      </div>
      <hr />
    </section>
  );
};

export default SettingsPage;