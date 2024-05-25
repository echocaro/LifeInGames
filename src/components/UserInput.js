import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import BtnImage from "../assets/signin-btn.png";

const UserInput = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const PROD_URL = process.env.REACT_APP_PROD_URL;
  const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

  const url =
    process.env.REACT_APP_IS_PROD === "false"
      ? `http://${LOCAL_URL}/login`
      : `https://${PROD_URL}/login`;

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
      <div className="md:flex-col md:w-1/2 bg-purple rounded-xl shadow-xl p-2">
        <h4 className="font-bold text-center text-black">
          Thanks for checking out my app!
        </h4>
        <div className="flex-row md:flex-col text-center">
          <p className="p-2 text-black">
            When you sign in, nothing gets stored in the servers.
          </p>
          <p className="p-2 text-black">
            We only request you sign in, so we can confirm the Steam ID being
            used belongs to you. We use this to fetch publicly available data
            such as game ownership and playtime. This data is processed to
            display your top games and gaming habits but is not stored on any
            server.
          </p>
          <p className="p-2 text-black">
            The steam id is temporarily stored in your device’s local storage to
            enhance your user experience while you are using the app. No
            personal data is retained after you close the session.
          </p>
          <p className="p-2 text-black">
            Note: Your profile must be public for everything to work correctly
          </p>
        </div>
      </div>
      <div className="flex-col">
        <h4 className="font-bold text-lg">Sign in with your Steam account:</h4>
        <button>
          <a href={`${url}`}>
            <img src={BtnImage} alt="" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default UserInput;
