import "./App.css";
import React from "react";
import Landingpage from "./Pages/UserInitialization/Landing_page";
import Register from "./Pages/UserInitialization/Register";
import Login from "./Pages/UserInitialization/Login";
import LoginTest from "./Pages/UserInitialization/LoginTest";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Home/Account";
import Contact from "./Pages/Home/Contact";

import ProjectPage from "./Pages/ProjectPage";
import FileEdit from "./Pages/FileEdit";
import ErrorPage from "./Pages/ErrorPage";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Landingpage />}/>
              <Route path="/Register" element={<Register />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/LoginTest" element={<LoginTest />}/>
              <Route path="/Home" element={<Home />}/>
              <Route path="/Account" element={<Account />}/>
              <Route path="/Contact" element={<Contact />}/>
              <Route path="/ProjectPage" element={<ProjectPage />}/>
              <Route path="/FileEdit" element={<FileEdit />}/>
              <Route path="/*" element={<ErrorPage />}/>
          </Routes>
      </Router>
  );
}

export default App;