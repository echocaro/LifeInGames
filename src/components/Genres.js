import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const steamId = Cookies.get("steamId");
  const colors = ["bg-pink", "bg-yellow", "bg-purple", "bg-green", "bg-orange"];

  const PROD_URL = process.env.REACT_APP_PROD_URL;
  const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;
  useEffect(() => {
    const fetchToken = async () => {
      if (!steamId) {
        return;
      }
      try {
        const url =
          process.env.REACT_APP_IS_PROD === "false"
            ? `http://${LOCAL_URL}/${steamId}/top-genres`
            : `https://${PROD_URL}/${steamId}/top-genres`;

        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setGenres(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchToken();
  }, [steamId]);

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-start font-light text-2xl mb-1">
        Top Genres
      </h2>
      <div className="flex flex-col w-auto md:flex-row ml:flex-row">
        {genres.map((genre, index) => (
          <div
            className={`${colors[index]} mt-4 pt-5 pl-5 pb-5 pr-5 md:pt-2 lg:pt-2 md:pb-2 lg:pb-2 md:pl-3 lg:pl-3 md:pr-3 lg:pr-3 rounded-2xl sm:w-64 md:mr-1 md:w-52`}
          >
            <h2 className="font-bold text-center">{index + 1}</h2>
            <h3 className="font-regular text-center">{genre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
