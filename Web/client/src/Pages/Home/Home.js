import './Home.css';
import {
    useState, 
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAuth0 } from '@auth0/auth0-react';

import account_picture from '../../images/account.png';
import folder_icon from '../../images/Folder_Icon.png';
import search_icon from '../../images/Search_Icon.png';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

function Home() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

     const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0;
  const [auth, setAuth] = useState({
    isLoading: true,
    isAuthenticated: false,
    accessToken: null
  });

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(accessToken => {
        setAuth({
          isLoading: false,
          isAuthenticated: true, accessToken
        });
      });
    } else {
      setAuth({
        isLoading: false,
        isAuthenticated: false,
        accessToken: null
      })
      console.log("NOT AUTHENT");
    }
  }, [isAuthenticated, getAccessTokenSilently]);
    
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
                            <section className='project'>
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