import LoginForm from "../../components/LoginForm/loginForm";
import RegisterForm from "../../components/RegisterForm/registerForm";
import "./loginPageStyle.css";
import { useState } from "react";

const LoginPage = () => {
  const [cardLoginForm, setCardLoginForm] = useState(true)

  return (
    <section className="login-page">
      <div className="card">
        <h1 className="login-title">TerraTrend</h1>
        <h2 className="login-subtitle">{cardLoginForm ? "Login to continue" : "Create an Account"}</h2>
        <LoginForm status={cardLoginForm} handleCardLoginForm={() => setCardLoginForm(false)}/>
        <RegisterForm status={cardLoginForm} handleCardLoginForm={() => setCardLoginForm(true)}/>
      </div>
    </section>
  );
};

export default LoginPage;