import "./Register.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {FaRegEnvelope, FaUser, FaLock, FaLinkedinIn} from "react-icons/fa";
import {ImFacebook} from "react-icons/im";
import {FcGoogle} from "react-icons/fc";

import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

function Register() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, loginWithPopup } = useAuth0();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
    console.log(`Email: ${email}`);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
    console.log(`Username: ${username}`);
  };

  const handlePasswordChange = event => {
      setPassword(event.target.value);
      console.log(`Password: ${password}`);
  };

  const registerButton = async event => {

    event.preventDefault();
    // Validate the email and password
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
      setError("Please enter a valid email address");
      return;
    } 
    else if (!password) 
    {
      setError("Please enter a valid password");
      return;
    }
    
    try {
      registerButton({
              email,
              username,
              password
          });

    }
    catch (error) {
      setError('Invalid email or password.');
      return;
    }

  };


  const register = async event => {
    // make an axios call to the server to register the user
    // try {
      console.log("RegisterTest.js: handleSubmit() called");

      axios.post("http://localhost:3001/register", {
          email: email,
          username: username,
          password: password
      })
      .then((res) => {
        navigate("/Home");
      })
      .catch ((error) => {
        setError(error.response.data['message'].match(/:(.*)/)[1]);
        return;
      })
  };

  return (
    <div className="Register">
      <div className="Registration">
        <div className="RegisterTitle">
          <h1>Register For an Account</h1>
          <h2>Register using</h2>
        </div>
        <div className="RegisterOptions">
          <FcGoogle className="googleIcon"/>
          <FaLinkedinIn className="LinkedInIcon"/>
          <ImFacebook className="FacebookIcon"/>
        </div>
        <div className="orSeparator">
          <div className="line"></div>
          <h1>or</h1>
          <div className="line"></div>
        </div>
          <div className="RegisterFields">
          <div className="input">
            <FaRegEnvelope className="EmailIcon"/>
            <input
              type="text"
              className="emailInput"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input">
            <FaUser className="UserIcon"/>
            <input
              type="text"
              className="usernameInput"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input">
            <FaLock className="PasswordIcon"/>
            <input
              type="password"
              className="passwordInput"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button className="registerButton" onClick={registerButton}> Register </button>
          <p className="error">{error}</p>
        </div>
      </div>
      <div className="WelcomeInfo">
        <text className="WelcomeTitle">Welcome to PhotoCode</text>
        <text className="WelcomeText">Scan any writing using Google's VisionAI, edit as a text file, store and transfer to or from the cloud </text>
          <button className="gotoLogin" onClick={() => loginWithRedirect({redirectUri: 'http://localhost:3000/Home',})}> Login </button>
      </div>
    </div>
  );
}

export default Register;