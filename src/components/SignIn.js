import React from "react";

const SignIn = () => {
  return (
    <div>
      <h3>Hello</h3>
      <a
        href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITCH_API}&redirect_uri=http://localhost:3000/home&scope=user_read`}
      >
        Connect with twitch
      </a>
    </div>
  );
};

export default SignIn;
