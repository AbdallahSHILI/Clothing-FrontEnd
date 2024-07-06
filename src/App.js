import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  ContactUs,
  Home,
  Login,
  Register,
  Favorite,
  Fashion,
  NewClothes,
  AllClothes,
  OneClothes,
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
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Favorite" element={<Favorite />} />
          <Route path="/Fashion" element={<Fashion />} />
          <Route path="/NewClothes" element={<NewClothes />} />
          <Route path="/AllClothes" element={<AllClothes />} />
          <Route path="/OneClothes/:id" element={<OneClothes />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
