import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="text-center w-3/5 mt-[8%] ml-[20%] flex flex-col md:flex-row mb-5">
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
