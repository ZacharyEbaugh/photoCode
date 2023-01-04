import './Home.css';
import {
    useState, 
    useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import jwt from 'jwt-decode';

import account_picture from '../../images/account.png';
import folder_icon from '../../images/Folder_Icon.png';
import search_icon from '../../images/Search_Icon.png';
import { PhotoCodeHeader } from '../PhotoCodeHeader';

function Home(props) {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    // const listOfProjects = [
    //     {
    //         name: "Portfolio Webpage",
    //         date: "5/27/2022",
    //         img_link: require("../../images/proj_1.png"),
    //         lang_1: "HTML",
    //         lang_2: "CSS",
    //         lang_3: "JavaScript",
    //     },
    //     {
    //         name: "Stupid Webpage",
    //         date: "5/27/2022",
    //         img_link: require("../../images/proj_1.png"),
    //         lang_1: "HTML",
    //         lang_2: "CSS",
    //         lang_3: "JavaScript",
    //     }
    // ]

    // Get all projects for user from database
    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        console.log(user_id);
        axios.get(`https://photocode.app:443/getAllProjects?user_id=${user_id}`)
            .then(res => {
                // res.data.forEach(project => {
                //     listOfProjects.push(project);
                // });
                setProjects(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        console.log(projects);
    }, []);

  
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
                            <button className='createProjectButton' onClick={() => navigate('/CreateProject')}>
                                <img className='createProjectIcon' src={folder_icon} />
                                New
                            </button>
                        </div>
                    </header>
                    {projects.map((project) => {
                        console.log(project);
                        return (
                            <section className='project' key={project._id}>
                                <img className='projectImage' src={project.img_link} />
                                <div className='projectTitlesWrapper'>
                                    <h1 className='projectTitle'>{project.name}</h1>
                                    {/* <h1 className='projectDateDesc'>Last Modified:</h1> */}
                                    <h1 className='projectDate'>Last modified: {project.date}</h1>
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
