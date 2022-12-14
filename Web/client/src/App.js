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
  Route,
} from "react-router-dom";

import { useAuth0, setIsAuthenticated } from "@auth0/auth0-react";

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0;
  const [auth, setAuth] = useState({
    isLoading: true,
    isAuthenticated: false,
    accessToken: null
  });

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
  };

  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     getAccessTokenSilently().then(accessToken => {
  //       setAuth({
  //         isLoading: false,
  //         isAuthenticated: true, accessToken
  //       });
  //     });
  //   } else {
  //     setAuth({
  //       isLoading: false,
  //       isAuthenticated: false,
  //       accessToken: null
  //     })
  //   }
  // }, [isAuthenticated, getAccessTokenSilently]);


  // if (auth.isLoading) {
  //   return (<div>Loading</div>);
  // }
  // else if (auth.isAuthenticated) {
  //   return (<div>Home</div>);
  // }
  // else {
  //   return (
  //     <Router>
  //           <Routes>
  //              <Route path="/" element={<Landingpage />}/>
  //              <Route path="/Home" element={<Home />}/>
  //           </Routes>
  //       </Router>
  //     );
  // }

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Landingpage />}/>
              <Route path="/Register" element={<Register />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/Home" element={<Home />}/>
              <Route path="/Account" element={<Account />}/>
              <Route path="/Contact" element={<Contact />}/>
              <Route path="/ProjectSettings" element={<ProjectSettings />}/>
              <Route path="/ProjectPage" element={<ProjectPage />}/>
              <Route path="/CreateProject" element={<CreateProject />}/>
              <Route path="/FileEdit" element={<FileEdit />}/>
              <Route path="/*" element={<ErrorPage />}/>
          </Routes>
      </Router>
  );
}

export default App;