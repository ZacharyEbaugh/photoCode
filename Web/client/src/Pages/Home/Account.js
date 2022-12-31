import './Account.css';
import {
    useState, 
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

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
                        <h2 className='userConnection'>Connection Type: {user.connection}</h2>
                    </div>
                    <div className='userActions'>
                        <button className='userAction'>Change Email</button>
                        <button className='userAction'>Change Username</button>
                        <button className='userAction'>Change Password</button>
                        <button className='dangerAction'>Delete Account</button>
                    </div>

                </div>
            </div>
        </div>
        
      </div>
    );
  }
  
  export default Account;