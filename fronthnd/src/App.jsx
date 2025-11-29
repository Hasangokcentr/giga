import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard"; // <-- DİKKAT: Küçük 'b' ile

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana sayfa açılınca Login gelsin */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Dashboard yolu küçük harfle olsun */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
