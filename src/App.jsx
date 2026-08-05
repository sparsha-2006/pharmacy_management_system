import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import AddMedicine from "./pages/AddMedicine";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Alerts from "./pages/Alerts";
import AIRecommendation from "./pages/AIRecommendation";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Medicines */}
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/add-medicine" element={<AddMedicine />} />

      {/* Inventory */}
      <Route path="/inventory" element={<Inventory />} />

      {/* Orders */}
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />

      {/* Alerts */}
      <Route path="/alerts" element={<Alerts />} />

      {/* AI */}
      <Route path="/ai" element={<AIRecommendation />} />

      {/* Analytics */}
      <Route path="/analytics" element={<Analytics />} />

      {/* Invalid URL */}
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/profile" element={<Profile />} />
      
    </Routes>
  );
}

export default App;