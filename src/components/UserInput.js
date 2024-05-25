import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import BtnImage from "../assets/signin-btn.png";

const UserInput = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const steamId = queryParams.get("steamId");

    if (steamId) {
      Cookies.set("steamId", steamId, { expires: 1 });
      navigate("/dashboard");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col w-72 mt-24 md:-mt-24 md:flex-row md:w-auto md:justify-around">
      <div className="md:flex-col md:w-1/2">
        <h4 className="font-bold text-center">
          Thanks for checking out my app!
        </h4>
        <div className="flex-row md:flex-col text-center">
          <p className="p-2">
            {
              "When you enter your SteamID, it does not get stored in a database. It simply gets stored locally in order to show your aggregated data!"
            }
          </p>
          <p className="p-2">
            We only use your Steam ID to fetch publicly available data such as
            game ownership and playtime. This data is processed to display your
            top games and gaming habits but is not stored on any server.
          </p>
          <p className="p-2">
            Data is temporarily stored in your device’s local storage to enhance
            your user experience while you are using the app. No personal data
            is retained after you close the session.
          </p>
          <p className="p-2">
            Note: Your profile must be public for everything to work correctly
          </p>
        </div>
      </div>
      <div className="flex-col">
        <h4 className="text-center font-bold text-lg">
          Sign in with your Steam account:
        </h4>
        <button>
          <a href="http://localhost:8080/login">
            <img src={BtnImage} alt="" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default UserInput;
