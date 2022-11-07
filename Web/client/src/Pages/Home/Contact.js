import './Contact.css';
import {
    useState, 
    useEffect
} from "react";
import Axios from "axios";

import account_picture from '../../images/account.png';
import zac_picture from '../../images/zacProfilePic.jpg';
import brandon_picture from '../../images/brandonProfilePic.png';
import linkedin_icon from '../../images/linkedin_icon_black.png';
import github_icon from '../../images/github_icon_black.png';
import terminal_icon from '../../images/terminal_icon_black.png';

function Contact() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      Axios.get("http://localhost:3001/getUsers").then((response) => {
        setListOfUsers(response.data);
      });
    }, []);
  
    return (
      <div className="container">  
        <header className='header'>
            <h1 className='headerTextPhotocode'>PhotoCode</h1>
            <div className='headerRight'>
                <h1 className='headerTextNav'>Contact</h1>
                <h1 className='headerTextNav'>Account</h1>
                <button className='profileButton'><img className='headerPicture' src={account_picture} /></button>    
            </div>
        </header>

        <section className='main'>
            <div className='profileCardWrapper'>
                <div className='profileCard'>
                    <h1 className='profileName'>Zachary Licong Ebaugh</h1>
                    <div className='contactInfoWrapper'>
                        <img className='profilePicture' src={zac_picture} />
                        <div className='socialLinksWrapper'>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={linkedin_icon} />
                                <h2 className='socialName'>LinkedIn</h2>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={github_icon} />
                                <h2 className='socialName'>GitHub</h2>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={terminal_icon} />
                                <h2 className='socialName'>Portfolio</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profileCard offset'>
                    <h1 className='profileName'>Brandon Stephen Spangler</h1>
                    <div className='contactInfoWrapper'>
                        <img className='profilePicture' src={brandon_picture} />
                        <div className='socialLinksWrapper'>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={linkedin_icon} />
                                <h2 className='socialName'>LinkedIn</h2>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={github_icon} />
                                <h2 className='socialName'>GitHub</h2>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={terminal_icon} />
                                <h2 className='socialName'>Portfolio</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contactForm'>
                <h1 className='contactTitle'>Send us your thoughts</h1>
                <div className='companyInputWrapper'>
                    <h2 className='inputTitle'>Company/Organization</h2>
                    <input className='companyInput' />
                </div>
                <div className='contactMessageWrapper'>
                    <h2 className='inputTitle'>Message</h2>
                    <textarea className='messageInput'></textarea>
                </div>
            </div>
        </section>
      </div>
    );
  }
  
  export default Contact;