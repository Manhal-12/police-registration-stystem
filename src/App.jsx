import { Routes, Route } from "react-router-dom";

import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Citizens from "./Pages/Citizens";
import Officers from "./Pages/Officers";
import Registrations from "./Pages/Registrations";
import Reports from "./Pages/Reports";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/citizens" element={<Citizens />} />
      <Route path="/officers" element={<Officers />} />
      <Route path="/registrations" element={<Registrations />} />
      <Route path="/reports" element={<Reports />} />
   
    </Routes>
  );
}

export default App;