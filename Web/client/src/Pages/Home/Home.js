import './Home.css';
import {
    useState, 
    useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import account_picture from '../../images/account.png';
import folder_icon from '../../images/Folder_Icon.png';
import { MdClear } from "react-icons/md";
import search_icon from '../../images/Search_Icon.png';
import { PhotoCodeHeader } from '../PhotoCodeHeader';


function Home(props) {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const search = (query) => {
        // Set the searchQuery state variable to the query argument
        setSearchQuery(query);
        console.log(searchQuery);
    }

    const handleClear = () => {
        setSearchQuery('');
    }
    useEffect(() => {
        // Update the input field whenever the searchQuery state variable changes
        document.getElementById('search-input').value = searchQuery;
      }, [searchQuery]);

    // Get all projects for user from database
    // useEffect(() => {
    //     const user_id = localStorage.getItem('user_id');
    //     console.log("In use effect to populate projects");

    //     const getProjects = async() => {
    //         await axios.get(`http://localhost:3001/getAllProjects?user_id=${user_id}`)
    //         .then(res => {
    //             console.log(res.data);
    //             setProjects(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     }
    //     getProjects();
    //     console.log(projects);
    // }, []);


    useEffect(() => {
        // Create a Promise to get the user ID from local storage
        const getUserId = new Promise((resolve, reject) => {
          const user_id = localStorage.getItem('user_id');
          if (user_id) {
            resolve(user_id);
          } else {
            reject(new Error('No user ID found in local storage'));
          }
        });
    
        // Wait for the Promise to resolve before making the API call
        getUserId.then(user_id => {
          // Fetch the projects from the database
          axios.get(`http://localhost:3001/getAllProjects?user_id=${user_id}`)
            .then(res => {
              // Update the state with the fetched projects
              setProjects(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }).catch(err => {
          console.error(err);
        });
      }, [localStorage.getItem('user_id')]);

    // Filter projects based on search query and return the filtered projects list
    const searchResults = projects.filter((item) => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
    return (
      <div className="containerHome">  
        <PhotoCodeHeader/>
        <div className='main'>
            <div className='sidebar'>
                <div className='projectsWrapper'>
                    <header className='projectsHeader'>
                        <h1 className='projectsTitle'>Projects</h1>
                        <div className='projectsButtonWrapper'>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    id="search-input"
                                    className="searchProjects"
                                    placeholder="Search Projects"
                                    onChange={event => search(event.target.value)}
                                />
                                {(searchQuery != '') && <button className="clearProjectSearch" onClick={handleClear}>
                                    <MdClear 
                                        className="clearProjectSearchIcon"
                                    />
                                </button>}
                            </div>
                            {/* <div className='inputWrapper'>
                                <img className='searchIcon' src={search_icon} />
                                <input className='searchProjectInput' placeholder='Search Projects'></input>
                            </div> */}
                            <button className='createProjectButton' onClick={() => navigate('/CreateProject')}>
                                <img className='createProjectIcon' src={folder_icon} />
                                New
                            </button>
                        </div>
                    </header>
                    {Object.entries((searchQuery === '') ? projects : searchResults).map(([key, project]) => {
                        return (
                            <section className='project' key={project._id} onClick={() => console.log(navigate('/ProjectPage?project_id=' + project._id))}>
                                <img className='projectImage' src={require("../../images/proj_1.png")} />
                                <div className='projectTitlesWrapper'>
                                    <h1 className='projectTitle'>{project.name}</h1>
                                    {/* <h1 className='projectDateDesc'>Last Modified:</h1> */}
                                    <h1 className='projectDesc'>{project.description}</h1>
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
            </div>
            <div className='projectInformationWrapper'>
                <div className='readMeWrapper'>
                    <h1 className='readMeTitle'>Read Me</h1>
                </div>
                <div className='releaseNotesWrapper'>
                    <h1 className='releaseNotesTitle'>Release Notes</h1>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;