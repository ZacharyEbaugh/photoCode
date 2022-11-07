import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Landing_page</Link>
    </li>
    <li>
      <Link to="/Login">Login</Link>
    </li>
    <li>
      <Link to="/Register">Register</Link>
    </li>
    <li>
      <Link to="/FileEdit">FileEdit</Link>
    </li>
  </div>
  );
}
export default navbar;