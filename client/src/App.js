import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import ChartOfAccounts from "./pages/ChartOfAccounts/ChartOfAccounts";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
