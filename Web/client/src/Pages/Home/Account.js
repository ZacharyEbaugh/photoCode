import './Account.css';
import {
    useState, 
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

import zacProfilePic from '../../images/zacProfilePic.jpg';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

import { useAuth0 } from '@auth0/auth0-react';

function Account() {
    const navigate = useNavigate();

    const user = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        picture: localStorage.getItem('picture'),
        connection: localStorage.getItem('connection')
    }

    const tooltip = (
        <Tooltip id="tooltip">
          This action cannot be performed because you are using a social connection.
        </Tooltip>
    );

    const handlePasswordChange = async() => {
        // Make axios call to send email to user with link to reset password
        try {
            Axios.post("http://localhost:3001/sendPasswordReset", {
                email: user.email
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("Email sent");
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
      <div className="containerHome">  
        <PhotoCodeHeader/>
        <div className='mainAccount'>
         
            <div className='accountInfo'>
                <h1>Account</h1>
                <hr></hr>
                <div className='accountInfoText'>
                    <div className='userInformation'>
                        <img className='userPicture' src={user.picture} />
                        <h2 className='userName'>Username: {user.name}</h2>
                        <h2 className='userEmail'>User Email: {user.email}</h2>
                        <h2 className='userConnection'>Connection Type: {(user.connection === "Username-Password-Authentication") ? "PhotoCode" : user.connection}</h2>
                    </div>
                    <div className='userActions'>
                        {user.connection !== "Username-Password-Authentication" ? (
                            <OverlayTrigger placement='right' overlay={tooltip}>
                                <button className='userActionNotAllowed'>Change Email</button>
                            </OverlayTrigger>
                        ) : (
                            <button className='userAction'>Change Email</button>
                        )}
                        {user.connection !== "Username-Password-Authentication" ? (
                            <OverlayTrigger placement='right' overlay={tooltip}>
                                <button className='userActionNotAllowed'>Change Username</button>
                            </OverlayTrigger>
                        ) : (
                            <button className='userAction'>Change Username</button>
                        )}
                        {user.connection !== "Username-Password-Authentication" ? (
                            <OverlayTrigger placement='right' overlay={tooltip}>
                                <button className='userActionNotAllowed'>Change Password</button>
                            </OverlayTrigger>
                        ) : (
                            <button className='userAction' onClick={() => handlePasswordChange()}>Change Password</button>
                        )}
                        <button className='dangerAction'>Delete Account</button>
                    </div>

                </div>
            </div>
        </div>
        
      </div>
    );
  }
  
  export default Account;
