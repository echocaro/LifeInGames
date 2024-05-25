import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UserInput from "./components/UserInput";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <div className="mr-auto ml-auto sm:w-1/2 md:w-2/4 flex md:h-screen justify-center items-center">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<UserInput />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
