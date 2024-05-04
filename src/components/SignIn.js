import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [steamId, setSteamId] = useState("");

  const handleInput = (e) => {
    setSteamId(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      Cookies.set("steamdId", steamId);
      navigate("/home");
      console.log("here");
    }
  };

  console.log("steam id: ", steamId);

  return (
    <div>
      <h3>Hello</h3>
      <input
        type="text"
        title="Enter your steamdid"
        placeholder="Example: 76561197960435530"
        value={steamId}
        onChange={handleInput}
        onKeyDown={handleEnter}
      />
    </div>
  );
};

export default SignIn;
