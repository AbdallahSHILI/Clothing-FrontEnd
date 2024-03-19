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
  Auth,
} from "./Pages/index";
import { Footer, Navbar } from "./Components/Index";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Clothes" element={<Clothes />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Catalogue" element={<Catalogue />} />
          <Route path="/Favorite" element={<Favorite />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
