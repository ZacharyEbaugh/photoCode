import "./AccountPopUp.css";
import { PopupMenu } from "react-simple-widgets";
import { useNavigate } from "react-router-dom";
import account_picture from "../../images/account.png";
import zacProfilePic from "../../images/zacProfilePic.jpg";

import { useAuth0 } from '@auth0/auth0-react';

export default function AccountPopUp() {
    const navigate = useNavigate();
    const { logout } = useAuth0();
    return (
        <div className="AccountPopUp">
            <PopupMenu className="popup">
                <button className='profileButton'><img className='headerPicture' src={zacProfilePic} /></button>    


                <div className="card">
                    <div className="card-header">
                        <h1>Signed in as</h1>
                        <h2>Zachary Ebaugh</h2>
                    </div>
                    <button className='actionButton' onClick={() => {navigate("/Account")}}>Account</button>
                    <button className='actionButton'onClick={() => logout({redirectUri: 'http://localhost:3000',})}>Logout</button>
                </div>
            </PopupMenu>
        </div>
    );
}
