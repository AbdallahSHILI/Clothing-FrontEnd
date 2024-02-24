import React, { useEffect, useState } from "react";
import "./Register.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";
import Axios from "axios";

const AuthRegister = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

const Register = () => {
  const [FisrtLastName, setFisrtLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");

  const API = "http://localhost:3001";

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      FisrtLastName,
      Email,
      PhoneNumber,
      Password,
    };
    try {
      await Axios.post("http://localhost:3001/Clothing/Users", data);
      alert("User created successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Registration failed: Backend endpoint not found.");
        alert("User registration failed. Please try again later.");
      } else {
        console.error("Error creating user:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <RegisterForm
      FisrtLastName={FisrtLastName}
      setFisrtLastName={setFisrtLastName}
      Email={Email}
      setEmail={setEmail}
      PhoneNumber={PhoneNumber}
      setPhoneNumber={setPhoneNumber}
      Password={Password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const RegisterForm = ({
  FisrtLastName,
  setFisrtLastName,
  Email,
  setEmail,
  PhoneNumber,
  setPhoneNumber,
  Password,
  setPassword,
  onSubmit,
}) => {
  return (
    <div className="Register_Container">
      <img src={logo1} />
      <div className="Right_Container">
        <div className="Register_Content">
          <h1>Register Now !</h1>
          <form className="Register_Form" onSubmit={onSubmit}>
            <div className="form-control-input">
              <input
                type="text"
                name="FisrtlastName"
                id="FisrtlastName"
                required="required"
                value={FisrtLastName}
                onChange={(e) => setFisrtLastName(e.target.value)}
              />
              <span className="label">First Last Name</span>
            </div>
            <div className="form-control-input">
              <input
                type="text"
                name="Email"
                id="Email"
                required="required"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="label">Email</span>
            </div>
            <div className="form-control-input">
              <input
                type="text"
                name="PhoneNumber"
                id="PhoneNumber"
                required="required"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <span className="label">Phone Number</span>
            </div>
            <div className="form-control-input">
              <input
                type="password"
                name="Password"
                id="Password"
                required="required"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="label">password</span>
            </div>
            {/* <div className="Checkbox">
              <input
                type="checkbox"
                id="Customer"
                name="Customer"
                value="Customer"
              />
              <label for="Customer">Customer</label>
            </div>
            <div className="checkbox_container">
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="Designer"
                  name="Designer"
                  value="Designer"
                />
                <label for="Designer">Designer</label>
              </div>
            </div> */}
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthRegister;
