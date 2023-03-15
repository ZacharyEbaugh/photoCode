import "./Register.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {FaRegEnvelope, FaUser, FaLock, FaBorderNone} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";

import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

function Register() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

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

  const ValidateRegister = async event => {
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
      axios.post("http://localhost:3001/register", {
        email: email,
        username: username,
        password: password,
        connection: 'Username-Password-Authentication'
        })
        .then((res) => {
          console.log(res);
          if (res.data.error)
          {

            if (res.data.error.includes(':'))
            {
              setError(res.data.error.match(/\:(.*)/)[1]);
              console.log(res.data.error.match(/\:(.*)/));
            }
            else
            {
              setError(res.data.error);
              console.log(res.data.error);
            }
            return;
          }
          else
          {
            setError("");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
          setError(err.response.data.error);
        });
    }
    catch (error) {
      setError('Invalid email or password.');
      return;
    }
  };
  return (
    <div className="Register">
      <div className="Registration">
      
        <div className="RegisterOptions">
          <div onClick={() => 
            {localStorage.setItem('connection', 'google')
            window.location.href=
            'https://photocode.us.auth0.com/authorize?'
            + 'response_type=code' + '&'
            + 'client_id=' + process.env.REACT_APP_AUTH0_CLIENT_ID + '&'
            + 'redirect_uri=' + 'https://photocode.app/Home' + '&'
            + 'scope=openid%20profile%20email' + '&'
            + 'connection=' + 'google-oauth2'
          }} className="Login" id="Google"> 
            <FcGoogle className="GoogleIcon"/>
            <h1>
              Sign in with Google
            </h1>
          </div>
         <div onClick={() => 
          {localStorage.setItem('connection', 'github')
          window.location.href=
          'https://photocode.us.auth0.com/authorize?'
          + 'response_type=code' + '&'
          + 'client_id=' + process.env.REACT_APP_AUTH0_CLIENT_ID + '&'
          + 'redirect_uri=' + 'https://photocode.app/Home' + '&'
          + 'scope=openid%20profile%20email' + '&'
          + 'connection=' + 'github'
          }} className="Login" id="GitHub"> 
            <FaGithub className="GitHubIcon"/>
            <h1>
              Sign in with GitHub
            </h1>
          </div>
          <div onClick={() => 
            {localStorage.setItem('connection', 'linkedin')
            window.location.href=
            'https://photocode.us.auth0.com/authorize?'
          + 'response_type=code' + '&'
          + 'client_id=' + process.env.REACT_APP_AUTH0_CLIENT_ID + '&'
          + 'redirect_uri=' + 'https://photocode.app/Home' + '&'
          + 'scope=openid%20profile%20email' + '&'
          + 'connection=' + 'linkedin'
          }} className="Login" id="LinkedIn"> 
            <TfiLinkedin className="LinkedInIcon"/>
            <h1>
              Sign in with LinkedIn
            </h1>
          </div>
          
          </div>
          <div className="orSeparator">
          <div className="line"></div>
          <h1>or</h1>
          <div className="line"></div>
        </div>
        <div className="RegisterTitle">
          <h1>Register For an Account</h1>
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
          <button className="registerButton" onClick={ValidateRegister}> Register </button>
          <p className="error">{error}</p>
        </div>
        
      
      </div>
      <div className="WelcomeInfo">
        <text className="WelcomeTitle">Welcome to PhotoCode</text>
        <text className="WelcomeText">Scan any writing using Google's VisionAI, edit as a text file, store and transfer to or from the cloud </text>
          <button className="gotoLogin" onClick={() => navigate('/Login')}> Login </button>
      </div>
    </div>
  );
}

export default Register;