import React, { useState } from "react";
import "./Register.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";
import { Axios } from "axios";

const Register = () => {
  const [FisrtlastName, setFisrtlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");

  const API = "http://localhost:3000";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${API}/Clothing/Users/Signup`, {
        FisrtlastName,
        Email,
        PhoneNumber,
        Password,
      });
      console.log("sayi");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="Register_Container">
      <img src={logo1} />
      <div className="Right_Container">
        <div className="Register_Content">
          <h1>Register Now !</h1>
          <form className="Register_Form" onSubmit={onSubmit}>
            <div class="form-control-input">
              <input
                type="text"
                name="fisrt_lastName"
                id="fisrt_lastName"
                required="required"
                value={FisrtlastName}
                onChange={(e) => setFisrtlastName(e.target.value)}
              />
              <span className="label">First Last Name</span>
            </div>
            <div class="form-control-input">
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
            <div class="form-control-input">
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
            <div class="form-control-input">
              <input
                type="password"
                name="password"
                id="password"
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
            <button type="submit" class="btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
