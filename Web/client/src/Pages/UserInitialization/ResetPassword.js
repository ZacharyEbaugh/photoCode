import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import {
    useState, 
    useEffect
} from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { FaLock } from "react-icons/fa";

import axios from "axios";

function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = event => {
      setPassword(event.target.value);
      console.log(`Password: ${password}`);
  };

  const handlePasswordConfirmChange = event => {
    setPasswordConfirm(event.target.value);
    console.log(`Password: ${password}`);
  };

    useEffect(() => {
        // Remove user credentials from local storage if they exist 
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_id');
        props.updateAuth({
            isLoading: false,
            isAuthenticated: false,
            accessToken: null,
            idToken: null
        })
    }, []);    

    const navigate = useNavigate();

  // Make axios call to reset password 
    const ResetPassword = async() => {
        // Grab variables from the url 
        const url = window.location.href;
        const urlParams = new URLSearchParams(url);
        const email = urlParams.entries().next().value[1];
        // Validate that both passwords are the same and not empty
        if (!password)
        {
            setError("Please enter a valid password");
            return;
        }
        try {
<<<<<<< Updated upstream
            axios.post("https://photocode.app/resetPassword", {
=======
            axios.post("https://photocode.app:8443/resetPassword", {
>>>>>>> Stashed changes
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    navigate("/Login");
                }
                else {
                    setError("Error resetting password");
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Error resetting password");
            })
        } catch (err) {
            console.log(err);
            setError("Error resetting password");
        }
    }

  return (
    <div className="ResetPasswordContainer">
      <div className="ResetPasswordBox">
        <div className="ResetPasswordTitle">
          <h1>Reset your password</h1>
        </div>
        <div className="PasswordFields">
            <div className="resetPasswordInput">
                <FaLock className="PasswordIconSym"/>
                <input
                type="password"
                className="passwordInputField"
                placeholder="New Password"
                onChange={handlePasswordChange}
                autoFocus/>
            </div>
            <div className="resetPasswordInput">
                <FaLock className="PasswordIconSym"/>
                <input
                type="password"
                className="passwordInputField"
                placeholder="Confirm Password"
                onChange={handlePasswordConfirmChange}
                />
            </div>
            <button className="resetButton" onClick={() => ResetPassword()}> Reset </button>
            <p className="error">{error}</p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;