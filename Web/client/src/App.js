import "./App.css";
import React from "react";
import Landingpage from "./Pages/UserInitialization/Landing_page";
import Register from "./Pages/UserInitialization/Register";
import Login from "./Pages/UserInitialization/Login";
import FileEdit from "./Pages/FileEdit";
import ErrorPage from "./Pages/ErrorPage";
import NavBar from "./Pages/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
      <Router>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Landingpage />}/>
              <Route path="/Register" element={<Register />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/FileEdit" element={<FileEdit />}/>
              <Route path="/*" element={<ErrorPage />}/>
          </Routes>
      </Router>
  );
}

export default App;