import './Home.css';
import {
    useState, 
    useEffect
} from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react';

import account_picture from '../../images/account.png';
import folder_icon from '../../images/Folder_Icon.png';
import search_icon from '../../images/Search_Icon.png';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

import axios from 'axios';

function Home(props) {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    // const [auth, setAuth] = useState({
    //     isLoading: true,
    //     isAuthenticated: false,
    //     accessToken: null
    // });

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
    
    // const token = localStorage.getItem('access_token');
    // console.log(props.auth.accessToken);
    // console.log(localStorage.getItem('auth0.is.authenticated'));
    // const token = props.auth.accessToken;
    // const fetchToken = async () => {
    //     const token = await getAccessTokenSilently();
    //     console.log(token);

    // }

    // fetchToken();
    // Call userInfo API to get user info
    // axios.post('http://localhost:3001/userInfo', {
    //     accessToken: token
    // }).then((response) => {
    //     localStorage.setItem('username', response.data.name);
    //     localStorage.setItem('email', response.data.email);
    //     localStorage.setItem('picture', response.data.picture);
    // }).catch((error) => {
    //     console.log(error);
    //     navigate('/Login');
    // });
  });
    
    const listOfProjects = [
        {
            name: "Portfolio Webpage",
            date: "5/27/2022",
            img_link: require("../../images/proj_1.png"),
            lang_1: "HTML",
            lang_2: "CSS",
            lang_3: "JavaScript",
        },
        {
            name: "Stupid Webpage",
            date: "5/27/2022",
            img_link: require("../../images/proj_1.png"),
            lang_1: "HTML",
            lang_2: "CSS",
            lang_3: "JavaScript",
        }
    ]
  
    return (
      <div className="containerHome">  
        <PhotoCodeHeader/>
        <section className='main'>
            <div className='sidebar'>
                <div className='projectsWrapper'>
                    <header className='projectsHeader'>
                        <h1 className='projectsTitle'>Projects</h1>
                        <div className='projectsButtonWrapper'>
                            <div className='inputWrapper'>
                                <img className='searchIcon' src={search_icon} />
                                <input className='searchProjectInput' placeholder='Search Projects'></input>
                            </div>
                            <button className='createProjectButton'>
                                <img className='createProjectIcon' src={folder_icon} />
                                Create Project
                            </button>
                        </div>
                    </header>
                    {listOfProjects.map((project) => {
                        return (
                            <section className='project' key={project.name}>
                                <img className='projectImage' src={project.img_link} />
                                <div className='projectTitlesWrapper'>
                                    <h1 className='projectTitle'>{project.name}</h1>
                                    <h1 className='projectTitle'>Last Modified:</h1>
                                    <h1 className='projectDate'>{project.date}</h1>
                                </div>
                                <div className='commonLangWrapper'>
                                    <div className='commonLang'>
                                        <h2 className='lang'>{project.lang_1}</h2>
                                        <span className='lang1Circle'></span>
                                    </div>
                                    <div className='commonLang'>
                                        <h2 className='lang'>{project.lang_2}</h2>
                                        <span className='lang2Circle'></span>
                                    </div>
                                    <div className='commonLang'>
                                        <h2 className='lang'>{project.lang_3}</h2>
                                        <span className='lang3Circle'></span>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className='releaseNotesWrapper'>
                    <h1 className='releaseNotesTitle'>Release Notes</h1>
                </div>
            </div>
            <div className='readMeWrapper'>
                <h1 className='readMeTitle'>Read Me</h1>
            </div>
        </section>
        
      </div>
    );
  }
  
  export default Home;