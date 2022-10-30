import "./Login.css";
import {
    useState, 
    useEffect
} from "react";
import Axios from "axios";

import {
    FaRegEnvelope, 
    FaLock, 
    FaLinkedinIn,
} from "react-icons/fa";

import {ImFacebook} from "react-icons/im";
import {FcGoogle} from "react-icons/fc";

function Login() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div className="Register">
      <div className="Registration">

        <div className="RegisterTitle">
          {/* <h1>Login to Your Account</h1> */}
          <h2>Login using</h2>
        </div>

        <div className="RegisterOptions">
          <FcGoogle className="googleIcon"/>
          <FaLinkedinIn className="LinkedInIcon"/>
          <ImFacebook className="FacebookIcon"/>
        </div>

        <div className="orSeparator">
          <div className="line"></div>
          {/* <h1>or</h1> */}
          <div className="line"></div>
        </div>

        <div className="RegisterFields">
          <div className="input">
            <FaRegEnvelope className="EmailIcon"/>
            <input
              type="text"
              className="emailInput"
              placeholder="Email or Username"
              onChange={(event) => {
                setName(event.target.value);
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

          <button className="registerButton"> Login </button>
        </div>
      </div>
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Password: {user.password}</h1>
            </div>
          );
        })}
      </div>
      
      <div className="WelcomeInfo">
        <text className="WelcomeTitle">Welcome back</text>
        <text className="WelcomeText">Scan any writing using Google's VisionAI, edit as a text file, store and transfer to or from the cloud </text>
        <button className="gotoLogin"> Register </button>

      </div>


      
    </div>
  );
}

export default Login;