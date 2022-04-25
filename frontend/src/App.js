import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import CarouselView from "./components/Home";
import Dashboard from "./components/Dashboard";
import EditEvent from "./components/EditEvent";
import Report from "./components/Report";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={[<CarouselView />]} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
