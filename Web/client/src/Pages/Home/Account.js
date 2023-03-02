import './Account.css';
import {
    useState, 
    useEffect
} from "react";
import LoadingPage from '../LoadingPage';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Tooltip } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { OverlayTrigger } from 'react-bootstrap';

import zacProfilePic from '../../images/zacProfilePic.jpg';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

import { useAuth0 } from '@auth0/auth0-react';

function Account(props) {
    const navigate = useNavigate();
    
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [responseText, setResponseText] = useState("");
    const [error, setError] = useState("");

    const [user, setUser] = useState({});

    useEffect(() => {
        // Get user information using user_id
        loadAllContent();
    }, [])

    const loadAllContent = async() => {
        const userInfo = await axios.post("https://photocode.app:8443/getUserInfo", {
            user_id: localStorage.getItem('user_id')
        })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                setUser({
                    name: res.data.username,
                    email: res.data.email,
                    picture: res.data.picture,
                    connection: res.data.connection
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
        Promise.resolve(userInfo).then(() => {
            props.setLoader(false);
        })
    }

    const tooltip = (
        <Tooltip id="tooltip">
          This action cannot be performed because you are using a social connection.
        </Tooltip>
    );

    const handleEmailChange = async() => {
        props.setLoader(true);
        // Make axios call to send email to user with link to reset password
        try {
            axios.post("https://photocode.app:8443/changeEmail", {
                user_id: localStorage.getItem('user_id'),
                newEmail: newEmail
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem('email', newEmail);
                    setResponseText("Email changed");
                    props.setLoader(false);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Error changing email");
                props.setLoader(false);
            })
        } catch (err) {
            console.log(err);
            setError("Error changing email");
            props.setLoader(false);
        }
    }

    const handleUsernameChange = async() => {
        props.setLoader(true);
        // Make axios call to send email to user with link to reset password
        try {
            axios.post("https://photocode.app:8443/changeUsername", {
                user_id: localStorage.getItem('user_id'),
                newUsername: newUsername
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem('name', newUsername);
                    setResponseText("Username changed");
                    props.setLoader(false);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Error changing username");
                props.setLoader(false);
            })
        } catch (err) {
            console.log(err);
            setError("Error changing username");
            props.setLoader(false);
        }
    }

    // const handlePasswordChange = async() => {
    //     props.setLoader(true);
    //     // Make axios call to send email to user with link to reset password
    //     try {
    //         axios.post("https://photocode.app:8443/sendPasswordReset", {
    //             email: user.email
    //         })
    //         .then((res) => {
    //             console.log(res);
    //             if (res.status === 200) {
    //                 console.log("Email sent");
    //                 setResponseText("Change password email sent");
    //                 props.setLoader(false);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setError("Error resetting password");
    //             props.setLoader(false);
    //         })
    //     } catch (err) {
    //         console.log(err);
    //         setError("Error resetting password");
    //         props.setLoader(false);
    //     }
    // }

    const handlePasswordChange = async() => {
        props.setLoader(true);
        // Make axios call to send email to user with link to reset password
        try {
            axios.post("https://photocode.app:8443/resetPassword", {
                email: user.email,
                password: password,
                passwordConfirm: passwordConfirm
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setResponseText("Password successfully changed");
                    props.setLoader(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setError("Error resetting password");
                props.setLoader(false);
            })
        } catch (err) {
            console.log(err);
            setError("Error resetting password");
            props.setLoader(false);
        }
    }

    if (props.auth.isLoading) {
        return (
            <LoadingPage />
        )
    } else {
        return (
        <div className="containerHome">  
            <PhotoCodeHeader auth={props.auth} setLoader={props.setLoader}/>
            <div className='mainAccount'>
            
                <div className='accountInfo'>
                    <h1>Account</h1>
                    <hr></hr>
                    <div className='accountInfoText'>
                        <div className='userInformation'>
                            <img className='userPicture' src={user.picture} referrerPolicy="no-referrer"/>
                            <h2 className='userName'>Username: {user.name}</h2>
                            <h2 className='userEmail'>Email: {user.email}</h2>
                            <h2 className='userConnection'>Connection Type: {(user.connection === "Username-Password-Authentication") ? "PhotoCode" : user.connection}</h2>
                        </div>
                        <div className='userActions'>
                            {user.connection !== "Username-Password-Authentication" ? (
                                <OverlayTrigger placement='right' overlay={tooltip}>
                                    <button className='userActionNotAllowed'>Change Email</button>
                                </OverlayTrigger>
                            ) : (
                                // <button className='userAction'>Change Email</button>
                                <Popup className='changeActivatePopup' trigger={<button className='userAction'>Change Email</button>} position="center" modal>
                                    {close => (
                                        <div className='changePopup'>
                                            <button className='closePopup' onClick={close}>&times;</button>
                                            <h1 className='changeTitle'>Change Email</h1>
                                            <input type='text' className='changeTextInput' placeholder='New Email' onChange={(e) => setNewEmail(e.target.value)}></input>
                                            <button className='confirmChange' onClick={() => handleEmailChange()}>Confirm</button>
                                        </div>
                                    )}
                                </Popup>
                            )}
                            {user.connection !== "Username-Password-Authentication" ? (
                                <OverlayTrigger placement='right' overlay={tooltip}>
                                    <button className='userActionNotAllowed'>Change Username</button>
                                </OverlayTrigger>
                            ) : (
                                // <button className='userAction'>Change Username</button>
                                <Popup className='changeActivatePopup' trigger={<button className='userAction'>Change Username</button>} position="center" modal>
                                    {close => (
                                        <div className='changePopup'>
                                            <button className='closePopup' onClick={close}>&times;</button>
                                            <h1 className='changeTitle'>Change Username</h1>
                                            <input type='text' className='changeTextInput' placeholder='New Username' onChange={(e) => setNewUsername(e.target.value)}></input>
                                            <button className='confirmChange' onClick={() => handleUsernameChange()}>Confirm</button>
                                        </div>
                                    )}
                                </Popup>
                            )}
                            {user.connection !== "Username-Password-Authentication" ? (
                                <OverlayTrigger placement='right' overlay={tooltip}>
                                    <button className='userActionNotAllowed'>Change Password</button>
                                </OverlayTrigger>
                            ) : (
                                // <button className='userAction' onClick={() => handlePasswordChange()}>Change Password</button>
                                <Popup className='changeActivatePopup' trigger={<button className='userAction'>Change Password</button>} position="center" modal>
                                    {close => (
                                        <div className='changePopup'>
                                            <button className='closePopup' onClick={close}>&times;</button>
                                            <h1 className='changeTitle'>Change Password</h1>
                                            <input type='password' className='changeTextInput' placeholder='New Password' onChange={(e) => setPassword(e.target.value)}></input>
                                            <input type='password' className='changeTextInput' placeholder='Confirm Password' onChange={(e) => setPasswordConfirm(e.target.value)}></input>
                                            <button className='confirmChange' onClick={() => handlePasswordChange()}>Confirm</button>
                                        </div>
                                    )}
                                </Popup>
                            )}
                            <button className='dangerAction'>Delete Account</button>
                            {(responseText != '') && <p className='responseText'>{responseText}</p>}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        );
    }
  }
  
  export default Account;
