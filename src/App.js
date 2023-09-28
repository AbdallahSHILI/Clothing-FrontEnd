import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Clothes, Home, Login, Register } from "./Pages/index";
import { Navbar } from "./Components/Index";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Clothes" element={<Clothes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
