import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import ReactDOM from "react-dom/client";
import { Auth0Provider, LocalStorageCache } from "@auth0/auth0-react";
import App from "./App";

// Assign environment variables to constants
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const secret = process.env.REACT_APP_AUTH0_CLIENT_SECRET;

// const onRedirectCallback = (appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        clientSecret={secret}
        // allowedOrigins={["http://localhost:3000"]}
        audience="https://photocode.us.auth0.com/api/v2/"
        storage={LocalStorageCache}
    >
        <App />
    </Auth0Provider>,
);

