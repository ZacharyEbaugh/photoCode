import "./Register.css";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {FaRegEnvelope, FaUser, FaLock, FaLinkedinIn} from "react-icons/fa";
import {ImFacebook} from "react-icons/im";
import {FcGoogle} from "react-icons/fc";

function Register() {
  const navigate = useNavigate();
  const Login = () => {
      navigate("/Login");
  }

  const Home = () => {
      navigate("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      email,
      username,
      password,
    })
    navigate("/");
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
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <FaUser className="UserIcon"/>
            <input
              type="text"
              className="usernameInput"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <FaLock className="PasswordIcon"/>
            <input
              type="password"
              className="passwordInput"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button className="registerButton" onClick={createUser}> Register </button>
        </div>
      </div>
      <div className="WelcomeInfo">
        <text className="WelcomeTitle">Welcome to PhotoCode</text>
        <text className="WelcomeText">Scan any writing using Google's VisionAI, edit as a text file, store and transfer to or from the cloud </text>
        <button className="gotoLogin" onClick={Login}> Login </button>
      </div>
    </div>
  );
}

export default Register;