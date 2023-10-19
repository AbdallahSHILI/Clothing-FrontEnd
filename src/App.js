import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Catalogue,
  Clothes,
  ContactUs,
  Home,
  Login,
  Register,
} from "./Pages/index";
import { Footer, Navbar } from "./Components/Index";

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
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Catalogue" element={<Catalogue />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
