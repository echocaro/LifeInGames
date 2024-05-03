import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log("code", code);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = axios
          .get("http://localhost:8080/token", {
            params: {
              code: code,
            },
          })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
        console.log("RESPONSE: ", response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchToken();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
