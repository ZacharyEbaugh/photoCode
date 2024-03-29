import "./AccountPopUp.css";
import React,{ useState, useEffect } from "react";
import { PopupMenu } from "react-simple-widgets";
import { useNavigate } from "react-router-dom";
import account_picture from "../../images/account.png";
import zacProfilePic from "../../images/zacProfilePic.jpg";

import { useAuth0 } from '@auth0/auth0-react';

export default function AccountPopUp(props) {

    const [userInfo, setUserInfo] = useState(null);
    const { logout } = useAuth0();

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            picture: localStorage.getItem('picture')
        })
    }, [])

    return (
        <div className="AccountPopUp">
            <PopupMenu className="popup">
                {/* <button className='profileButton'><img className='headerPicture' src={zacProfilePic} /></button>     */}
                <button className='profileButton'><img className='headerPicture' src={user.picture} referrerPolicy="no-referrer"/></button>
                <div className="card">
                    <div className="card-header">
                        <h1>Signed in as</h1>
                        <h2>{user.name}</h2>
                    </div>
                    <button className='actionButton' onClick={() => {navigate("/Account")}}>Account</button>
                    <button className='actionButton'onClick={() => 
                        {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('id_token');
                            localStorage.removeItem('user_id');

                            // navigate("/");
                            logout({redirectUri: 'https://photocode.app',})
                        }}>Logout</button>
                    </div>
            </PopupMenu>
        </div>
    );
}
