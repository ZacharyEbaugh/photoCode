import "./App.css";
import React from "react";
import Register from "./Pages/UserInitialization/Register";
import Login from "./Pages/UserInitialization/Login";
import ErrorPage from "./Pages/ErrorPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {

  return (
      <Router>
        <nav>
          <Link to="/Register"> Register </Link>
          <Link to="/Login"> Login </Link>
        </nav>

          <Routes>
              <Route path="/Register" element={<Register />}/>
              <Route path="/Login" element={<Login />}/>
              <Route path="/*" element={<ErrorPage />}/>
          </Routes>
      </Router>
  );
}

export default App;