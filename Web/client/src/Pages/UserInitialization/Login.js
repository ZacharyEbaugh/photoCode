import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
    useState, 
    useEffect
} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import {
    FaRegEnvelope, 
    FaLock, 
    FaLinkedinIn,
} from "react-icons/fa";

import {ImFacebook} from "react-icons/im";
import {FcGoogle} from "react-icons/fc";

function Login() {
  const [listOfUsers, setListOfUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
    console.log(`Email: ${email}`);
  };

  const handlePasswordChange = event => {
      setPassword(event.target.value);
      console.log(`Password: ${password}`);
  };


  const navigate = useNavigate();
  const Register = () => {
      navigate("/Register");
  }

  const Home = () => {
    navigate("/Home");
  }

  const { loginWithRedirect, login, isAuthenticated} = useAuth0();
  const Login = async event => {

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
      await loginWithRedirect({
              email,
              password
          });

    }
    catch (error) {
      setError('Invalid email or password.');
      return;
    }

    // Check if auth0 authentication is successful
    // if (auth0Response.status === 200) {

  };

  return (
    <div className="Register">
      <div className="Registration">
        <div className="RegisterTitle">
          <h1>Login to Your Account</h1>
          <h2>Login using</h2>
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
              placeholder="Email or Username"
              onChange={handleEmailChange}
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

          <button onClick={Login} className="registerButton"> Login </button>
          <p className="error">{error}</p>
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