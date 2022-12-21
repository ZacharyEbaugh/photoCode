import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

// Assign environment variables to constants
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const secret = process.env.REACT_APP_AUTH0_CLIENT_SECRET;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Auth0Provider
        domain='https://photocode.us.auth0.com'
        clientId='R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs'
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>
);

