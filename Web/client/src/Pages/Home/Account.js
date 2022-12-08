import './Account.css';
import {
    useState, 
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import zacProfilePic from '../../images/zacProfilePic.jpg';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

function Account() {
    const navigate = useNavigate();
    const userName = "Zachary Ebaugh";
    const userEmail = "zlebaughwps@gmail.com";
    return (
      <div className="containerHome">  
        <PhotoCodeHeader/>
        <div className='mainAccount'>
         
            <div className='accountInfo'>
                <h1>Account</h1>
                <hr></hr>
                <div className='accountInfoText'>
                    <div className='userInformation'>
                        <img className='userPicture' src={zacProfilePic} />
                        <h2 className='userName'>User Name: {userName}</h2>
                        <h2 className='userEmail'>User Email: {userEmail}</h2>
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