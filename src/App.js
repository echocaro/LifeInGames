import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
