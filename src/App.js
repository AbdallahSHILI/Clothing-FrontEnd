import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  ContactUs,
  Home,
  Login,
  Register,
  Favorite,
  NewClothes,
  AllClothes,
  OneClothes,
  AllBuyedClothes,
  Dashboard,
  UsersPage,
  OneUserPage,
  MessagesPage,
} from "./Pages/index";
import {
  ConfirmCancelAdmin,
  ConfirmCancelDelete,
  Footer,
  Navbar,
} from "./Components/Index";
import DeleteUser from "./Components/Buttons/DeleteUser-Button/DeleteUser";
import { MessageProvider } from "./useContext/messageContext";
import AllOffers from "./Pages/Catalogue-Clothes/AllOffers/AllOffersIcon/allOffersIcon";

function App() {
  return (
    <>
      <MessageProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Favorite" element={<Favorite />} />
            <Route path="/NewClothes" element={<NewClothes />} />
            <Route path="/AllClothes" element={<AllClothes />} />
            <Route path="/OneClothes/:id" element={<OneClothes />} />
            <Route path="/AllBuyedClothes" element={<AllBuyedClothes />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Dashboard/UsersPage" element={<UsersPage />} />
            <Route
              path="/Dashboard/UsersPage/:idUser"
              element={<OneUserPage />}
            />
            <Route
              path="/Dashboard/UsersPage/DeleteUser/:idUser"
              element={<ConfirmCancelDelete />}
            />
            <Route
              path="/Dashboard/UsersPage/PromoteUser/:idUser"
              element={<ConfirmCancelAdmin />}
            />
            <Route path="/AllMessages" element={<MessagesPage />} />

            <Route path="/AllOffers/:idClothes" element={<AllOffers />} />
          </Routes>
          <Footer />
        </Router>
      </MessageProvider>
    </>
  );
}

export default App;
