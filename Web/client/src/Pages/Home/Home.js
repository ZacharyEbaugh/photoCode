import './Home.css';
import {
    useState, 
    useEffect
} from "react";
import Axios from "axios";

import account_picture from '../../images/account.png';
import folder_icon from '../../images/Folder_Icon.png';
import search_icon from '../../images/Search_Icon.png';

function Home() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

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