import axios from "axios";
import React from "react";

const SignIn = () => {
  const fetchData = async () => {
    try {
      const response = axios
        .get("http://localhost:8080/api", {
          headers: {
            "Content-Type": "application/json",
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

  return (
    <div>
      <h3>Hello</h3>
      <button onClick={fetchData}>Join with twitch</button>
    </div>
  );
};

export default SignIn;
