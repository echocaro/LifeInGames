import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="mr-auto ml-auto sm:w-1/2 md:w-2/4 flex md:h-screen justify-center items-center">
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
