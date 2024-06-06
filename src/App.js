import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Catalogue,
  Clothes,
  ContactUs,
  Home,
  Login,
  Register,
  Favorite,
  Fashion,
  NewModel,
  AllModels,
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
          <Route path="/Favorite" element={<Favorite />} />
          <Route path="/Fashion" element={<Fashion />} />
          <Route path="/Fashion/NewModel" element={<NewModel />} />
          <Route path="/Fashion/AllModels" element={<AllModels />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
