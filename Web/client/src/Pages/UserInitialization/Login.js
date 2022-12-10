import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
    useState, 
    useEffect
} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { WebAuth } from "auth0-js";

import axios from "axios";

import {
    FaRegEnvelope, 
    FaLock, 
    FaLinkedinIn,
} from "react-icons/fa";

import {ImFacebook} from "react-icons/im";
import {FcGoogle} from "react-icons/fc";

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

  const ValidateLogin = async event => {

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
      console.log("Calling login");
      props.updateAuth({
        isLoading: true,
        isAuthenticated: false,
        accessToken: null
      });
      console.log("set auth");
      // axios.post("http://localhost:3001/login", {
      //   email: email,
      //   password: password
      //   })
      //   .then(async (res) => {
      //     if (res.data.error)
      //     {
      //       if (res.data.error.includes(':'))
      //       {
      //         setError(res.data.error.match(/\:(.*)/)[1]);
      //         console.log(res.data.error.match(/\:(.*)/));
      //       }
      //       else
      //       {
      //         setError(res.data.error);
      //         console.log(res.data.error);
      //       }
      //       return;
      //     }
      //     else
      //     {
      //       setError("");
      //       const token = JSON.stringify(res.data);
      //       console.log(token);
      //       // localStorage.setItem('access_token', token);
      //       props.updateAuth({
      //         isLoading: false,
      //         isAuthenticated: true,
      //         accessToken: token
      //       })

      //       console.log(props.auth);
            

      //       console.log("IsAuth " + isAuthenticated);
      //       navigate("/Home");
      //     }
      //   })
      // .catch((err) => {
      //   console.log("TESTERROR" + err);
      // });

      var webAuth = new WebAuth({
        domain: 'photocode.us.auth0.com',
        clientID: 'R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs'
      });
      
      const token = webAuth.login({
        realm: 'Username-Password-Authentication',
        username: 'zlebaughwps@gmail.com',
        password: '123',
        responseType: 'code',
        redirectUri: 'http://localhost:3000/Home'
      })
    }
    catch (error) {
      console.log(error);
      setError('Invalid email or password.');
      return;
    }
  };

  const ValidateGoogleLogin = async event => {
    event.preventDefault();

    try {
      console.log("Calling login");
      await loginWithRedirect
      ({
        connection: 'google-oauth2',
        redirectUri: 'http://localhost:3000/Home',
        prompt: 'login'
      })
      .then((res => {
        console.log(res);
        props.updateAuth ({
          isLoading: false,
          isAuthenticated: true,
          accessToken: localStorage.getItem('auth0.is.authenticated')
        });
        console.log("AUTH" + localStorage.getItem('auth0.is.authenticated'));
        setIsAuthenticated(true);
        navigate("/Home");
      }))
      .catch((err) => {
        console.log(err);
        console.log("AUTH" + props.auth);
        navigate("/Home");
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
        <div className="RegisterTitle">
          <h1>Login to Your Account</h1>
          <h2>Login using</h2>
        </div>

        <div className="RegisterOptions" onClick={ValidateGoogleLogin}
        >
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

          <button onClick={ValidateLogin} className="registerButton"> Login </button>
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