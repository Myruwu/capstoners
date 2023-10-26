import "./loginFormStyle.css";
import Button from "../Button/button";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field } from 'formik';
import { auth, signInWithGoogle } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { LoginInitialValue, LoginSchema } from "../../validation/loginValidation";


const LoginForm = ({handleCardLoginForm, status}) => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("You have successfully logged in!");
      navigate("/home");
    } catch (error) {
      alert("An error occurred during login. Please check your credentials.");
    }
  };

  return (
    <>
      <Formik initialValues={LoginInitialValue} validationSchema={LoginSchema} onSubmit={handleLogin}>
      {({ errors, touched }) => (
        <Form className={`user-form ${status ? "" : "close"}`}>
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
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
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
              {errors.password && touched.password && <div className="error">{errors.password}</div>}
              <Link style={{alignSelf: "end", marginTop:8}}>Forgot Password</Link>
            </div>
            <Button type="submit" variant="primary user-form-btn">
              Sign in
            </Button>
            <div className="nav-link">
              Don't have an account?
              <Link onClick={handleCardLoginForm}>Click here</Link>
            </div>
          </Form>
      )}
    </Formik>


    </>
  );
}
;
export default LoginForm