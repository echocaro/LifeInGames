import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const fetchToken = async () => {
    try {
      const response = await axios
        .post("http://localhost:8080/token", {
          code: code,
        })
        .catch(function (err) {
          console.log(err);
        });
      console.log("response: ", response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
