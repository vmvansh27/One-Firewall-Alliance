import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ViewRegisteredDeals from "./pages/ViewRegisteredDeals"; // your existing page
import RegisterDeal from "./pages/RegisterDeal"; // your existing page
import HomePage from "./pages/HomePage"
import DealDetails from "./pages/DealDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home/opps/register" element={<RegisterDeal />} />
      <Route path="/home/opps/registered" element={<ViewRegisteredDeals />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/deals" element={<ViewRegisteredDeals />} />
      <Route path="/deals/:id" element={<DealDetails />} />
    </Routes>
  );
}

export default App;
