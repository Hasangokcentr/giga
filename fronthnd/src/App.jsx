import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashBoard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
