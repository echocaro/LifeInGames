import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <h3>Hello</h3>
      <Link
        to={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_API}&redirect_uri=http://localhost:3000/home&scope=user_read`}
      >
        <button>Join with twitch</button>
      </Link>
    </div>
  );
};

export default SignIn;
