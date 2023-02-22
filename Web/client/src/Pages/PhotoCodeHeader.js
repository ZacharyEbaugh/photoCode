import './PhotoCodeHeader.css';
import account_picture from '../images/account.png';
import AccountPopUp from './Home/AccountPopUp';
import { useNavigate, useLocation } from 'react-router-dom';

export function PhotoCodeHeader (props) {
   const navigate = useNavigate();
   const location = useLocation();
    return (
        <header className='header'>
            {/* <h1 className='headerTextPhotocode'>PhotoCode</h1> */}
            <button className='headerTitleNav' onClick={() => 
                    {
                        if (location.pathname !== "/Home")
                        {
                            props.setLoader(true);
                            navigate("/Home");
                        }
                        else
                        {
                            console.log("AT HOME");
                        }
                    }
                }><h1 className="headerTextPhotocode">PhotoCode</h1></button> 
            <div className='headerRight'>
                <button className='headerTextNav' onClick={() => 
                    {
                        if (location.pathname !== "/Home")
                        {
                            props.setLoader(true);
                            navigate("/Home");
                        }
                        else
                        {
                            console.log("AT HOME");
                        }
                    }
                }>Home</button> 
                <button className='headerTextNav' onClick={() => 
                    {
                        props.setLoader(true);
                        navigate("/Contact");
                    }
                }>Contact</button>    
                <AccountPopUp setLoader={props.setLoader}/>
            </div>
        </header>
    );
}