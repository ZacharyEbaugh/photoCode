import './PhotoCodeHeader.css';
import account_picture from '../images/account.png';
import AccountPopUp from './Home/AccountPopUp';
import { useNavigate } from 'react-router-dom';


export function PhotoCodeHeader () {
   const navigate = useNavigate();
    return (
        <header className='header'>
            <h1 className='headerTextPhotocode'>PhotoCode</h1>
            <div className='headerRight'>
                <button className='headerTextNav' onClick={() => {navigate("/Home")}}>Home</button> 
                <button className='headerTextNav' onClick={() => {navigate("/Contact")}}>Contact</button>    
                <AccountPopUp/>
            </div>
        </header>
    );
}