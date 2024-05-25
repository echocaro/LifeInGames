import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const steamId = Cookies.get("steamId");
  console.log("steam?? ", steamId);

  const handleSignOut = () => {
    Cookies.remove("steamId");
    navigate("/home");
  };

  return (
    <div className="flex flex-row justify-between mt-10 md:w-1/2 items-center mr-10 ml-10 md:mr-auto md:ml-auto">
      <div
        className="text-2xl font-bold"
        style={{
          background: "linear-gradient(to right, #FF878F, #97C39E)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        The Gamers Wave
      </div>
      <h4
        onClick={handleSignOut}
        className={`${steamId ?? "hidden"} text-xl font-regular cursor-pointer`}
      >
        Sign Out
      </h4>
    </div>
  );
};

export default Nav;
