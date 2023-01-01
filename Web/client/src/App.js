import "./App.css";
import React, { useState, useEffect } from "react";
import Landingpage from "./Pages/UserInitialization/Landing_page";
import Register from "./Pages/UserInitialization/Register";
import Login from "./Pages/UserInitialization/Login";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Home/Account";
import Contact from "./Pages/Home/Contact";
import ProjectPage from "./Pages/Project/ProjectPage";
import FileEdit from "./Pages/Project/FileEdit";
import ProjectSettings from "./Pages/Project/ProjectSettings";
import ErrorPage from "./Pages/ErrorPage";
import CreateProject from "./Pages/Project/CreateProject";
import LoadingPage from "./Pages/LoadingPage";
import ResetPassword from "./Pages/UserInitialization/ResetPassword";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import axios from "axios";
import jwt from 'jwt-decode';
import { PhotoCodeHeader } from "./Pages/PhotoCodeHeader";

function App() {
  const [auth, setAuth] = useState({
    isLoading: false,
    isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
    accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
    idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
  });
  
  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };

  const setLoader = (isLoading) => {
    setAuth({
      isLoading: isLoading,
      isAuthenticated: auth.isAuthenticated,
      accessToken: auth.accessToken,
      idToken: auth.idToken
    });
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
      updateAuth({
        isLoading: true,
        isAuthenticated: false,
        accessToken: '',
        idToken: ''
      });
      setLoader(true);
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
          "redirect_uri": "http://localhost:3000/Home"    
          },
          {
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(response => {
            // Local storage tokens
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("id_token", response.data.id_token);
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
            console.log(decoded);
            // Attempt to register the user, if they already exist, it will fail
            // If they are logging in with a social, this will ensure all users are stored in the database
            axios.post("http://localhost:3001/register", {
              email: localStorage.getItem('email'),
              username: localStorage.getItem('name'),
              password: Math.random().toString(36),
              connection: localStorage.getItem('connection'),
            })
            .then(response => {
              // Get user id from mongoDB
              axios.post("http://localhost:3001/getUser", {
                email: localStorage.getItem('email'),
                connection: localStorage.getItem('connection'),
              })
              .then(response => {
                localStorage.setItem("user_id", response.data._id);
                // Update the authentication state and loader state
                updateAuth({
                  isLoading: true,
                  isAuthenticated: true,
                  accessToken: localStorage.getItem("access_token"),
                  idToken: localStorage.getItem("id_token")
                })
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
    if (window.location.pathname === "/" && localStorage.getItem("access_token") && localStorage.getItem('user_id')) {
      updateAuth({
        isLoading: false,
        isAuthenticated: true,
        accessToken: localStorage.getItem("access_token"),
        idToken: localStorage.getItem("id_token")
      });
      location.replace("/Home");
    }
  }, [window.location]);

  // Need to create and add back error page
  if (!auth.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Login" element={<Login auth={auth} updateAuth={updateAuth}/>}/>
          <Route path="resetPassword" element={<ResetPassword auth={auth} updateAuth={updateAuth}/>}/>
        </Routes>
      </Router>
    )
  } else if (auth.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}/>
          <Route path="*" element={<LoadingPage />}/>
          <Route element={<PhotoCodeHeader auth={auth} updateAuth={updateAuth} setLoader={setLoader}/>}/>
          <Route path="/Home" element={<Home auth={auth} updateAuth={updateAuth} setLoader={setLoader}/>}/>
          <Route path="/Account" element={<Account  setLoader={setLoader}/>}/>
          <Route path="/Contact" element={<Contact  setLoader={setLoader}/>}/>
          <Route path="/ProjectSettings" element={<ProjectSettings auth={auth} updateAuth={updateAuth} setLoader={setLoader}/>}/>
          <Route path="/ProjectPage" element={<ProjectPage auth={auth} setLoader={setLoader}/>}/>
          <Route path="/CreateProject" element={<CreateProject auth={auth} setLoader={setLoader}/>}/>
          <Route path="/FileEdit" element={<FileEdit auth={auth} setLoader={setLoader}/>}/>
          {/* <Route path="resetPassword" element={<ResetPassword />}/> */}
        </Routes>
      </Router>
    );
  }
}

export default App;