import './Contact.css';
import {
    useState, 
    useEffect
} from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

import account_picture from '../../images/account.png';
import zac_picture from '../../images/zacProfilePic.jpg';
import brandon_picture from '../../images/brandonProfilePic.png';
import linkedin_icon from '../../images/linkedin_icon_black.png';
import github_icon from '../../images/github_icon_black.png';
import terminal_icon from '../../images/terminal_icon_black.png';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

function Contact(props) {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
  
    const navigate = useNavigate();

    // Axios call sendemail to user on button click
    const sendEmail = () => {
        Axios.post("http://localhost:3001/sendEmail", {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            company: company,
            message: message,
        }).then((response) => {
            if (response.data.message) {
                alert(response.data.message);
            } else {
                alert("Email sent successfully!");
            } 
        });
        // Clear input fields after email is sent
        setCompany("");
        setMessage("");
    };

    return (
      <div className="containerContact">  
        <PhotoCodeHeader  setLoader={props.setLoader}/>

        <section className='main'>
            <div className='profileCardWrapper'>
                <div className='profileCard'>
                    <h1 className='profileName'>Zachary Licong Ebaugh</h1>
                    <div className='contactInfoWrapper'>
                        <img className='profilePicture' src={zac_picture} />
                        <div className='socialLinksWrapper'>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={linkedin_icon} />
                                <a href="https://www.linkedin.com/in/zachary-ebaugh-1a3271224/" target="_blank" rel="noreferrer">
                                    LinkedIn
                                </a>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={github_icon} />
                                <a href="https://github.com/ZacharyEbaugh" target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={terminal_icon} />
                                <a href="https://zacharyebaugh.com" target="_blank" rel="noreferrer">
                                    Portfolio
                                </a>                            </div>
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
                                <a href="https://www.linkedin.com/in/brandon-spangler-0680291a0/" target="_blank" rel="noreferrer">
                                    LinkedIn
                                </a>
                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={github_icon} />
                                <a href="https://github.com/brandonspangler2" target="_blank" rel="noreferrer">
                                    GitHub
                                </a>                            </div>
                            <div className='socialNameWrapper'>
                                <img className='socialIcon' src={terminal_icon} />
                                <a href="https://brandonspangler.com" target="_blank" rel="noreferrer">
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contactForm'>
                <h1 className='contactTitle'>Send us your thoughts</h1>
                <div className='companyInputWrapper'>
                    <h2 className='inputTitle'>Company/Organization</h2>
                    <input 
                        className='companyInput'
                        value={company}
                        onChange={(event) => {
                            setCompany(event.target.value);
                        }} 
                    />
                </div>
                <div className='contactMessageWrapper'>
                    <h2 className='inputTitle'>Message</h2>
                    <textarea 
                        className='messageInput'
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                        rows={5}
                        cols={5}
                    />
                </div>
                <button onClick={sendEmail}>Submit</button>
            </div>
        </section>
      </div>
    );
  }
  
  export default Contact;