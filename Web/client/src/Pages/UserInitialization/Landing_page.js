import React, {useState, useRef, useEffect} from 'react';
import "./Landing_page.css";
import { useNavigate } from "react-router-dom";

import AppStore from "../../Assets/AppStoreButton.png";
import GooglePlay from "../../Assets/GooglePlayButton.png";
import HeroImage from "../../Assets/Hero_Img.png";
import Showcase from "../../Assets/Mobile_Card_Showcase.png";
import ZacProfile from "../../Assets/ZacProfile.png";
import BrandonProfile from "../../Assets/BrandonProfile.png";
import LinkedInIcon from "../../Assets/icon_linkedin_.png";
import GitHubIcon from "../../Assets/icon_github_.png";
import PortfolioIcon from "../../Assets/icon_terminal_.png";
import ProfileToContact from "../../Assets/ProfileToContact.png";

import Axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

export default function Landing_page() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const scrollToFeatures = useRef();
  const scrollToAbout = useRef();
  const scrollToContact = useRef();
  const navigate = useNavigate();

  const Register = () => {
    navigate("/Register");
  };

  const Login = () => {
    navigate("/Login");
    };

  // Axios call sendemail to user on button click
    const sendEmail = () => {
        Axios.post("http://localhost:3001/sendEmail", {
            name: name,
            email: email,
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
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
    };

    const { User, isAuthenticated } = useAuth0();
     useEffect(() =>  {
    
        // Retrieve an array of all keys in local storage
        const keys = Object.keys(localStorage);

        // Iterate over the array of keys and retrieve each item from local storage
        keys.forEach((key) => {
        // Retrieve the item from local storage
        const item = localStorage.getItem(key);

        // Print the item to the console
        console.log(`${key}: ${item}`);
        });
        console.log("AUTHENTICATION: " + isAuthenticated);
        console.log("USER " + User);

    });


  return (
    <div className="LandingPageContainer">
        <div className="SplashSection">
            <div className="topNav">
                <div className="NavLinks">
                    <a href="https://github.com/ZacharyEbaugh/photoCode" target="_blank" rel="noreferrer">
                        <button className="HomeButton">Home</button>
                    </a>
                    <a href="https://github.com/ZacharyEbaugh/photoCode" target="_blank" rel="noreferrer">
                        <button className="UpdatesButton">Updates</button>
                    </a>
                    <a href="https://github.com/ZacharyEbaugh/photoCode" target="_blank" rel="noreferrer">
                        <button className="GitHubButton">GitHub</button>
                    </a>
                    <a href="https://github.com/ZacharyEbaugh/photoCode" target="_blank" rel="noreferrer">
                        <button className="DocButton">Documentation</button>
                    </a>
                </div>
                <div className="UserInitialization">
                    <button onClick={Login} className="LoginButton">Login</button>
                    <button onClick={Register} className="RegisterButton">Register</button>
                </div>
            </div>
            <div className="SplashInfo">
                <div className="TitleInfo">
                    <h1>
                        Scan-in, Upload <br/> and Transfer
                    </h1>
                    <h2>
                        Developer tool for cloud<br/>
                        storage, file scan<br/>
                        conversion, and direct<br/>
                        transfer to GitHub
                    </h2>
                    <div className="DownloadButtons">
                        <button className="AppStoreButton">
                            <img src={AppStore} className="AppleStore" alt="Apple App Store" />
                        </button>
                        <button className="GooglePlayButton">
                            <img src={GooglePlay} className="GoogleStore" alt="Google Play Store" />
                        </button>
                    </div>
                    <h3>
                        Developed By Zachary Ebaugh and Brandon Spangler
                    </h3>
                </div>
                <div className="HeroImg">
                    <img className="AppImage" role="hero_image" src={HeroImage} alt="AppHeroImage"></img>
                </div>
            </div>
        </div>
        <div className="ShowcaseSection">
            <div className="NavShowcase">
                <button className="FeaturesButton" onClick={() => scrollToFeatures.current.scrollIntoView({behavior: "smooth"})}>Features</button>
                <button className="AboutUsButton" onClick={() => scrollToContact.current.scrollIntoView({block: 'center', behavior: 'smooth'})}>About Us</button>
                <button className="ContactUsButton" onClick={() => scrollToContact.current.scrollIntoView({block: 'start', behavior: 'smooth'})}>Contact Us</button>            
            </div>
            <div className="MobileShowcase">
                <img className="ShowcaseImage" role="showcase" src={Showcase} alt="MobileShowcase" ref={scrollToFeatures}/>
            </div>
        </div>
        <div className="InfoContactSection" >
            <div className="AboutUs">
                <div className="ZacProfile">
                    <div className="name">
                        <h1>Zachary Licong Ebaugh</h1>
                    </div>
                    <div className="Info">
                        <div className="profilePic">
                            <img src={ZacProfile} alt="ZacProfile"/>
                        </div>
                        <div className="PersonalLinks">
                            <div className="LinkedIn">
                                <img src={LinkedInIcon} alt="LinkedInIcon"/>
                                <a href="https://www.linkedin.com/in/zachary-ebaugh-1a3271224/" target="_blank" rel="noreferrer">
                                    LinkedIn
                                </a>
                            </div>
                            <div className="GitHub">
                                <img src={GitHubIcon} alt="GitHubIcon"/>
                                <a href="https://github.com/ZacharyEbaugh" target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                            <div className="Portfolio">
                                <img src={PortfolioIcon} alt="PortfolioIcon"/>
                                <a href="https://zacharyebaugh.com" target="_blank" rel="noreferrer">
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="BrandonProfile" ref={scrollToAbout}>
                    <div className="name">
                        <h1>Brandon Stephen Spangler</h1>
                    </div>
                    <div className="Info">
                    <div className="profilePic">
                            <img src={BrandonProfile} alt="BrandonProfile"/>
                        </div>
                        <div className="PersonalLinks">
                            <div className="LinkedIn">
                                <img src={LinkedInIcon} alt="LinkedInIcon"/>
                                <a href="https://www.linkedin.com/in/brandon-spangler-0680291a0/" target="_blank" rel="noreferrer">
                                    LinkedIn
                                </a>
                            </div>
                            <div className="GitHub">
                                <img src={GitHubIcon} alt="GitHubIcon"/>
                                <a href="https://github.com/brandonspangler2" target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                            <div className="Portfolio">
                                <img src={PortfolioIcon} alt="PortfolioIcon"/>
                                <a href="https://brandonspangler.com" target="_blank" rel="noreferrer">
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ContactUs" ref={scrollToContact}>
                <img src={ProfileToContact} alt="ProfileConnection"/>
                <div className="ContactInputs">
                    <h1>Let us know what you think!</h1>
                    <div className="UserInput">
                        <div className="UserInfo">
                            <div className="NameInput">
                                <h1>Name</h1>
                                <input
                                    type="text"
                                    className="NameInput"
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="NameInput">
                                <h1>Email</h1>
                                <input
                                    type="email"
                                    className="EmailInput"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="NameInput">
                                <h1>Company/Organization</h1>
                                <input
                                    type="text"
                                    className="CompanyInput"
                                    value={company}
                                    onChange={(event) => {
                                        setCompany(event.target.value);
                                    }}
                                />
                                </div>
                        </div>
                        <div className="UserMessage">
                            <h1>Message</h1>
                            <textarea
                                className="MessageInput"
                                value={message}
                                onChange={(event) => {
                                    setMessage(event.target.value);
                                }}
                                rows={5}
                                cols={5}
                            />
                            <button onClick={sendEmail}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
