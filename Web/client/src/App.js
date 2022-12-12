import "./App.css";
import React, { useState, useEffect } from "react";
import Landingpage from "./Pages/UserInitialization/Landing_page";
import Register from "./Pages/UserInitialization/Register";
import Login from "./Pages/UserInitialization/Login";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Home/Account";
import Contact from "./Pages/Home/Contact";
import FileEdit from "./Pages/FileEdit";
import ErrorPage from "./Pages/ErrorPage";

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
      
            {!isAuthenticated ? 
              <Routes>
                <Route path="/" element={<Landingpage />}/>
                <Route path="/Register" element={<Register />}/>
                <Route path="/Login" element={<Login auth={auth} updateAuth={updateAuth}/>}/>
                <Route path="/Home" element={<Home auth={auth}/>}/>

              </Routes>
              :
              <Routes>
                <Route path="/Account" element={<Account />}/>
                <Route path="/Contact" element={<Contact />}/>
                <Route path="/FileEdit" element={<FileEdit />}/>
              </Routes>
            }

      
              {/* <Route path="/*" element={<ErrorPage />}/> */}
       
      </Router>
  );
}

export default App;