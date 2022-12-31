import './PhotoCodeHeader.css';
import account_picture from '../images/account.png';
import AccountPopUp from './Home/AccountPopUp';
import { useNavigate } from 'react-router-dom';

export function PhotoCodeHeader (props) {
   const navigate = useNavigate();
    return (
        <header className='header'>
            <h1 className='headerTextPhotocode'>PhotoCode</h1>
            <div className='headerRight'>
                <button className='headerTextNav' onClick={() => 
                    {
                        navigate("/Home");
                        props.setLoader(true);
                    }
                }>Home</button> 
                <button className='headerTextNav' onClick={() => 
                    {
                        navigate("/Contact");
                        props.setLoader(true);
                    }
                }>Contact</button>    
                <AccountPopUp/>
            </div>
        </header>
    );
}