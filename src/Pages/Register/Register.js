import React, { useState } from "react";
import "./Register.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";
import Axios from "axios";

const Register = () => {
  const [FirstLastName, setFirstLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const API = "http://localhost:3001";

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`${API}/Clothing/Users/Signup`, {
        FirstLastName,
        Email,
        PhoneNumber,
        Password,
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <RegisterForm
      FirstLastName={FirstLastName}
      setFirstLastName={setFirstLastName}
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
  FirstLastName,
  setFirstLastName,
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
            <div className="form_control_input">
              <input
                type="text"
                name="FirstLastName"
                id="FirstLastName"
                required="required"
                value={FirstLastName}
                onChange={(e) => setFirstLastName(e.target.value)}
              />
              <span className="label">First Last Name</span>
            </div>
            <div className="form_control_input">
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
            <div className="form_control_input">
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
            <div className="form_control_input">
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

export default Register;
