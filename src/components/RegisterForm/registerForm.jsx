import Button from "../../components/Button/button";
import { auth } from "../../config/firebase";
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import { 
  RegisterInitialValue, 
  RegisterSchema 
} from "../../validation/registerValidation";
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
} from "firebase/auth";
import { 
  IoMailOutline, 
  IoLockClosedOutline 
} from "react-icons/io5";
import { doc,  setDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";

const RegisterForm = ({handleCardLoginForm,status}) => {
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    const { 
      firstName,
      lastName,
      email, 
      password,
     } = values;
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        firstName,
        lastName,
      };

      const userDocRef = doc(db, 'users', userCredential.user.uid);

      await setDoc(userDocRef, userData);
      
      navigate("/home");
      await sendEmailVerification(userCredential.user);
      alert("You have successfully created an account! Please check your email for verification.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    
  };


  return (
    <Formik
      initialValues={RegisterInitialValue} 
      onSubmit={handleSignUp} 
      validationSchema={RegisterSchema}>
      {({errors, touched}) => (
        <Form className={`user-form ${status ? "close" : ""}`}>
          <div className="user-input-name-form">
            <div className="user-input-div">
              <label>First Name</label>
              <div className="user-input">
                <Field 
                  type="text"
                  name="firstName"
                  placeholder="John" 
                />
              </div>
              {errors.firstName && touched.firstName ? (
              <div className="error">{errors.firstName}</div>
              ) : null}
            </div>
            <div className="user-input-div">
              <label>Last Name</label>
              <div className="user-input">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Doe" 
                />
              </div>
              {errors.lastName && touched.lastName ? (
              <div className="error">{errors.lastName}</div>
              ) : null}
            </div>
          </div>

          <div className="user-input-div">
            <label>Email</label>
            <div className="user-input">
              <IoMailOutline />
              <Field
                type="email"
                name="email"
                placeholder="johndoe123@gmail.com" 
              />
            </div>
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
              ) : null}
          </div>
          <div className="user-input-div">
            <label>Password</label>
            <div className="user-input">
              <IoLockClosedOutline />
              <Field
                type="password" 
                name="password"
                placeholder="Password must be at least 8 characters"
              />
            </div>
            {errors.password && touched.password ? (
              <div className="error">{errors.password}</div>
              ) : null}
          </div>
          <div className="user-input-div">
            <label>Confirm Password</label>
            <div className="user-input">
              <IoLockClosedOutline />
              <Field 
                type="password" 
                name="confirmPassword"
                placeholder="Passwords must match"
              />
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="error">{errors.confirmPassword}</div>
              ) : null}
          </div>

          <Button type="submit" variant="primary user-form-btn" size="full lg">Sign up</Button>
          <div className="nav-link">
              Already have an account?
              <Link onClick={handleCardLoginForm}>Click here</Link>
            </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;


