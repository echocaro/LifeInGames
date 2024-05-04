import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const steamId = Cookies.get("steamdId");
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const fetchToken = async () => {
        if (!steamId) {
          return;
        }
        try {
          const response = await axios.get(
            `http://localhost:8080/${steamId}/top-genres`,
            {
              steamId: steamId,
            }
          );
          setGenres(response?.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchToken();
    }
  }, [steamId]);

  return (
    <div>
      {genres.map((genre) => (
        <div>
          <h3 className="text-white">{genre}</h3>
        </div>
      ))}
    </div>
  );
};

export default Genres;
