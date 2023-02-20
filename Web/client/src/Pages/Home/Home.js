import './Home.css';
import React, {
    useState, 
    useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import Markdown from 'markdown-to-jsx';


import account_picture from '../../images/account.png';
import folder_icon from '../../images/Folder_Icon.png';
import { MdClear } from "react-icons/md";
import search_icon from '../../images/Search_Icon.png';
import { PhotoCodeHeader } from '../PhotoCodeHeader';
import LoadingPage from '../LoadingPage';


function Home(props) {

    // UI Mounted Loader
    const [isLoading, setIsLoading] = React.useState(false);

    // const handleLoading = () => {
    //     setIsLoading(false);
    // }

    // useEffect(()=>{
    //     window.addEventListener("load",handleLoading);
    //     return () => window.removeEventListener("load",handleLoading);
    //     handleLoading();
    // },[])

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

    // Useeffect to populate the readme section with the readme of the project on github
    const [postContent, setPostcontent] = useState('')
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        import('./../../README.md')
        .then(res =>
            fetch(res.default)
            .then(response => response.text())
            .then(response => setPostcontent(response))
            .catch(err => console.log(err))
        )
    }, [])

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
              props.setLoader(false);
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
  
    if (props.auth.isLoading) {
        return (
          <LoadingPage />
        )
      } else {
        return (
            <div className="containerHome">  
                <PhotoCodeHeader  setLoader={props.setLoader}/>
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
                                            value={searchQuery}
                                            onChange={event => search(event.target.value)}
                                        />
                                        {(searchQuery != '') && <button className="clearProjectSearch" onClick={handleClear}>
                                            <MdClear 
                                                className="clearProjectSearchIcon"
                                            />
                                        </button>}
                                    </div>
                                    <button className='createProjectButton' onClick={() => navigate('/CreateProject')}>
                                        <img className='createProjectIcon' src={folder_icon} />
                                        New
                                    </button>
                                </div>
                            </header>
                            {Object.entries((searchQuery === '') ? projects : searchResults).map(([key, project]) => {
                                return (
                                    <section className='project' key={project._id} onClick={() => {
                                        props.setLoader(true);
                                        navigate('/ProjectPage?project_id=' + project._id, { state: { commits: project.commits } });
                                        }}>
                                        {/* <img className='projectImage' src={require("../../images/proj_1.png")} /> */}
                                        <div className='projectTitlesWrapper'>
                                            <h1 className='projectTitle'>{project.name}</h1>
                                            <h1 className='projectDesc'>{project.description}</h1>
                                        </div>
                                        {/* <div className='commonLangWrapper'>
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
                                        </div> */}
                                    </section>
                                );
                            })}
                        </div>
                    </div>
                    <div className='projectInformationWrapper'>
                        <div className='readMeWrapper'>
                            <h1 className='readMeTitle'>Read Me</h1>
                            <div className='markdown-body'>
                                <Markdown className="readMe">{postContent}</Markdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
  }
  
  export default Home;
