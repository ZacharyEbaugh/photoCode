import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
    useState, 
    useEffect
} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { WebAuth } from "auth0-js";

import axios from "axios";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaRegEnvelope } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleEmailChange = event => {
    setEmail(event.target.value);
    console.log(`Email: ${email}`);
  };

  const handlePasswordChange = event => {
      setPassword(event.target.value);
      console.log(`Password: ${password}`);
      console.log(props.auth);
  };

  const navigate = useNavigate();
  const Register = () => {
      navigate("/Register");
  }

  return (
    <div className="Register">
      <div className="Registration">
        <div className="RegisterTitle">
          <h1>Login to Your Account</h1>
        </div>
        <div className="LoginButtons">
          <div onClick={() => loginWithRedirect({
            connection: 'google-oauth2',
            redirectUri: 'http://localhost:3000/Home',
            prompt: 'login'
          })} className="Login" id="Google"> 
            <FcGoogle className="GoogleIcon"/>
            <h1>
              Sign in with Google
            </h1>
          </div>
         <div onClick={() => loginWithRedirect({
            connection: 'github',
            redirectUri: 'http://localhost:3000/Home',
            prompt: 'login'
          })} className="Login" id="GitHub"> 
            <FaGithub className="GitHubIcon"/>
            <h1>
              Sign in with GitHub
            </h1>
          </div>
          <div onClick={() => loginWithRedirect({
            connection: 'linkedin',
            redirectUri: 'http://localhost:3000/Home',
            prompt: 'login'
          })} className="Login" id="LinkedIn"> 
            <TfiLinkedin className="LinkedInIcon"/>
            <h1>
              Sign in with LinkedIn
            </h1>
          </div>
          <div onClick={() => loginWithRedirect({
            connection: 'Username-Password-Authentication',
            redirectUri: 'http://localhost:3000/Home',
            prompt: 'login'
          })} className="Login" id="email"> 
            <FaRegEnvelope className="emailIcon"/>
            <h1>
              Sign in with Email
            </h1> 
          </div>
      </div>
      </div>
      {/* <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Password: {user.password}</h1>
            </div>
          );
        })}
      </div> */}
      
      <div className="WelcomeInfo">
        <text className="WelcomeTitle">Welcome back</text>
        <text className="WelcomeText">Scan any writing using Google's VisionAI, edit as a text file, store and transfer to or from the cloud </text>
        <button onClick={Register} className="gotoRegister"> Register </button>

      </div>


      
    </div>
  );
}

export default Login;