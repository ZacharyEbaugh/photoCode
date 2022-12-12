import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
    useState, 
    useEffect
} from "react";

import { useAuth0 } from "@auth0/auth0-react";

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
          <div onClick={() => 
            window.location.href=
            'https://accounts.google.com/o/oauth2/v2/auth?'
            + 'response_type=code&'
            + 'client_id=' + process.env.REACT_APP_GOOGLE_AUTH0_CLIENT_ID + '&'
            + 'redirect_uri=' + 'http://localhost:3000/Home' + '&'
            + 'scope=' + 'https://www.googleapis.com/auth/userinfo.profile'
          } className="Login" id="Google"> 
            <FcGoogle className="GoogleIcon"/>
            <h1>
              Sign in with Google
            </h1>
          </div>
         <div onClick={() => 
          window.location.href=
          'https://github.com/login/oauth/authorize?'
          + 'prompt=' + 'login' + '&'
          + 'response_type=' + 'code' + '&'
          + 'redirect_uri=' + 'http://localhost:3000/Home' + '&'
          + 'scope=' + 'user:email' + '&'
          + 'client_id=' + process.env.REACT_APP_AUTH0_GITHUB_CLIENT_ID
         } className="Login" id="GitHub"> 
            <FaGithub className="GitHubIcon"/>
            <h1>
              Sign in with GitHub
            </h1>
          </div>
          <div onClick={() => 
            window.location.href=
            'https://linkedin.com/oauth/v2/authorization?'
            + 'prompt=' + 'login' + '&'
            + 'response_type=' + 'code' + '&'
            + 'redirect_uri=' + 'http://localhost:3000/Home' + '&'
            + 'scope=' + 'r_liteprofile%20r_emailaddress' + '&'
            + 'client_id=' + process.env.REACT_APP_AUTH0_LINKEDIN_CLIENT_ID
          } 
          className="Login" id="LinkedIn"> 
            <TfiLinkedin className="LinkedInIcon"/>
            <h1>
              Sign in with LinkedIn
            </h1>
          </div>
          <div onClick={() => 
            window.location.href=
            'https://' + process.env.REACT_APP_AUTH0_DOMAIN 
            + '/authorize?response_type=code&'
            + 'client_id=' + process.env.REACT_APP_AUTH0_CLIENT_ID 
            + '&redirect_uri=http://localhost:3000/Home'
          } 
          className="Login" id="email"> 
            <FaRegEnvelope className="emailIcon"/>
            <h1>
              Sign in with Email
            </h1> 
          </div>
      </div>
      </div>
      <div className="WelcomeInfo">
        <text className="WelcomeTitle">Welcome back</text>
        <text className="WelcomeText">Scan any writing using Google's VisionAI, edit as a text file, store and transfer to or from the cloud </text>
        <button onClick={Register} className="gotoRegister"> Register </button>
      </div>
    </div>
  );
}

export default Login;