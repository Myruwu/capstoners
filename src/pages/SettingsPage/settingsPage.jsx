import "./settingsPageStyle.css";
import { useState, useEffect } from 'react';
import Button from "../../components/Button/button";
import { auth, db } from "../../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, updateEmail, updatePassword,  sendEmailVerification } from 'firebase/auth';

const SettingsPage = () => {
  const authUser = getAuth();
  const [oldEmail, setOldEmail] = useState(''); 
  const [newEmail, setNewEmail] = useState(''); 
  const [newEmailPassword, setNewEmailPassword] = useState(''); 
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
  const handleUpdateEmail = () => {
    if (newEmail) {
      sendEmailVerification(authUser.currentUser)
      .then(() => {
        updateEmail(authUser.currentUser, newEmail)
          .then(() => {
            alert("You have successfully updated your email address!");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
    }
  };

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
      // Update the user's first name and last name in Firestore
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
      <hr/>
      <h3>Change Personal Information</h3>
      <form>
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
      <hr />
      <h3>Change Email Address</h3>
      <form>
      <input
        type="email"
        placeholder="Old email address"
        value={oldEmail}
        onChange={(e) => setOldEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="New email address"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="Password"
        value={newEmailPassword}
        onChange={(e) => setNewEmailPassword(e.target.value)}
      />
      <Button 
        type="button" 
        variant="primary"
        onClick={handleUpdateEmail}>
          Change Email
      </Button>
      </form>
      <hr />
      <h3>Change Password</h3>
      <form>
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
          variant="primary"
          onClick={handleUpdatePassword}>
          Change Password
        </Button>
      </form>
      <hr />
    </section>
  );
};

export default SettingsPage;
