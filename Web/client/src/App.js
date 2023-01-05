import "./App.css";
import React, { useState, useEffect } from "react";
import Landingpage from "./Pages/UserInitialization/Landing_page";
import Register from "./Pages/UserInitialization/Register";
import Login from "./Pages/UserInitialization/Login";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Home/Account";
import Contact from "./Pages/Home/Contact";
import ProjectPage from "./Pages/ProjectPage";
import FileEdit from "./Pages/FileEdit";
import ProjectSettings from "./Pages/ProjectSettings";
import ErrorPage from "./Pages/ErrorPage";
import CreateProject from "./Pages/CreateProject";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import axios from "axios";
import jwt from 'jwt-decode';

function App() {
  const [auth, setAuth] = useState({
    isLoading: true,
    isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
    accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
    idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
  });
  
  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };

  const [user, setUser] = useState({
    name: localStorage.getItem('name') != null ? localStorage.getItem('name') : '',
    email: localStorage.getItem('email') != null ? localStorage.getItem('email') : '',
    picture: localStorage.getItem('picture') != null ? localStorage.getItem('picture') : '',
  });
  
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // When a user logs in this effect is responsible for grabbing the access token
  // Setting the authentication state, and updating the user state using the id_token information
  // This effect will also register a user if they logged in using a social provider
  // This effect only runs when users are initially directed to the home page and there is no access token stored yet
  useEffect(() => {
    if (window.location.pathname === "/Home" && !localStorage.getItem("access_token")) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('code')) {
        const code = urlParams.get('code');
        localStorage.setItem("authorizationCode", code);
      }
      if (localStorage.getItem("authorizationCode") != null && auth.accessToken === null) {
        console.log("Code: " + localStorage.getItem("authorizationCode"));
        axios.post('https://photocode.us.auth0.com/oauth/token', {
          "grant_type": "authorization_code",
          "code": localStorage.getItem("authorizationCode"),
          "client_id": "R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs",
          "client_secret": "Y2aFtzhPni6-WT65su48BYzfyItcozp_ft1qeuap9KzaF2ED24AbWkEVNh9LWmXK",
          "redirect_uri": "https://photocode.app/Home"    
          },
          {
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(response => {
            // Local storage tokens
            console.log("OAuth Responsse: " + response.data.access_token + "\t" + response.data.id_token);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("id_token", response.data.id_token);

            // Update auth state
            updateAuth({
                isLoading: false,
                isAuthenticated: true,
                accessToken: localStorage.getItem("access_token"),
                idToken: localStorage.getItem("id_token")
            })

            // Decode JWT
            const decoded = jwt(response.data.id_token);

            // Store email in local storage, GitHub does not provide email
            if (decoded.email === undefined) {
                localStorage.setItem("email", decoded.nickname);
            }
            else {
                localStorage.setItem("email", decoded.email);
            }
            // Local Storage other user data
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("picture", decoded.picture);
            console.log("Calling Register");
            // Attempt to register the user, if they already exist, it will fail
            // If they are logging in with a social, this will ensure all users are stored in the database
            axios.post("https://photocode.app:8443/register", {
              email: localStorage.getItem('email'),
              username: localStorage.getItem('name'),
              password: Math.random().toString(36),
              connection: localStorage.getItem('connection'),
            })
            .then(response => {
              console.log("After Register calling getUser");
              // Get user id from mongoDB
              axios.post("https://photocode.app:8443/getUser", {
                email: localStorage.getItem('email'),
                connection: localStorage.getItem('connection'),
              })
              .then(response => {
                console.log("User ID: " + response.data._id);
                localStorage.setItem("user_id", response.data._id);
              })
              .catch(error => {
                console.log(error);
              })
            })
          })
        }
      }
  }, [window.location]);

  // This effect is responsible for directing users that are authenticated to the home page
  // This can happen if a user does not logout before exiting the application since that is where
  // we will remove local storage tokens
  // This effect will run when users hit the splash page and there is a valid access token stored
  useEffect(() => {
    if (window.location.pathname === "/" && localStorage.getItem("access_token")) {
      updateAuth({
        isLoading: false,
        isAuthenticated: true,
        accessToken: localStorage.getItem("access_token"),
        idToken: localStorage.getItem("id_token")
      });
      location.replace("/Home");
    }
  }, [window.location]);

  if (!auth.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Login" element={<Login auth={auth} updateAuth={updateAuth}/>}/>
        </Routes>
      </Router>
    )
  }

  else if (auth.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Account" element={<Account />}/>
          <Route path="/Contact" element={<Contact />}/>
          <Route path="/ProjectSettings" element={<ProjectSettings />}/>
          <Route path="/ProjectPage" element={<ProjectPage />}/>
          <Route path="/CreateProject" element={<CreateProject />}/>
          <Route path="/FileEdit" element={<FileEdit />}/>
        </Routes>
      </Router>
    );
  }

  {/* <Route path="/*" element={<ErrorPage />}/> */}
}

export default App;
