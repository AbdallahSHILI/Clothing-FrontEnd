import React, { useState } from "react";
import "./Register.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";
import Axios from "axios";
import validator from "validator"; // Add this

const Register = () => {
  const [FirstLastName, setFirstLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const API = "http://localhost:3001";

  const validateForm = () => {
    const errors = {};
    const nameParts = FirstLastName.trim().split(" ");
    if (nameParts.length < 2) {
      errors.FirstLastName = "Please enter both first and last name!";
    }
    if (!validator.isEmail(Email)) {
      errors.Email = "Please enter a valid email!";
    }
    if (Password.length < 8) {
      errors.Password = "Password must be at least 8 characters long!";
    }
    if (PhoneNumber.length < 8) {
      errors.PhoneNumber = "PhoneNumber must be at least 8 number long!";
    }
    if (!Gender) {
      errors.Gender = "Please select a gender!";
    }

    // Add other validations as needed

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors, false otherwise
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Stop the form submission if validation fails
    }
    try {
      const response = await Axios.post(`${API}/Clothing/Users/Signup`, {
        FirstLastName,
        Email,
        PhoneNumber,
        Password,
        Gender,
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ backend: error.response.data.message }); // Handle backend validation errors
      } else {
        setErrors({ backend: "Registration failed: " + error.message });
      }
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
      Gender={Gender}
      setGender={setGender}
      onSubmit={onSubmit}
      errors={errors}
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
  Gender,
  setGender,
  onSubmit,
  errors,
}) => {
  return (
    <div className="Register_Container">
      <img src={logo1} alt="Logo" />
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
              {errors.FirstLastName && (
                <p className="error">{errors.FirstLastName}</p>
              )}
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
              {errors.Email && <p className="error">{errors.Email}</p>}
            </div>
            <div className="form_control_input">
              <input
                type="number"
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
              <span className="label">Password</span>
              {errors.Password && <p className="error">{errors.Password}</p>}
            </div>
            <div className="form_control_input">
              <label>
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={Gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={Gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              {errors.Gender && <p className="error">{errors.Gender}</p>}
            </div>

            {errors.backend && <p className="error">{errors.backend}</p>}
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
