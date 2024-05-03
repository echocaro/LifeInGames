import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const isMounted = useRef(false);
  const code = searchParams.get("code");
  console.log("code: ", code);

  useEffect(() => {
    if (!isMounted.current) {
      // Run only on initial mount
      isMounted.current = true;
      const fetchToken = async () => {
        if (!code) {
          // If code is not present, skip API call
          return;
        }
        try {
          const response = await axios.post("http://localhost:8080/token", {
            code: code,
          });
          console.log("response: ", response);
          Cookies.set(ACCESS_TOKEN, response?.data?.access_token, {
            expires: response?.data?.expires_in,
          });
          Cookies.set(REFRESH_TOKEN, response?.data?.refresh_token, {
            expires: response?.data?.expires_in,
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchToken();
    }
  }, [code]);

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
