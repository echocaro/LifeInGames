import React from "react";
import Games from "./Games";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Games />
    </div>
  );
};

export default Dashboard;
