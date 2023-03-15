import './ProjectSettings.css';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';
import { PhotoCodeHeader } from '.././PhotoCodeHeader';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectSettings(props) {
    // State variables for project information
    const [projectNamePlaceholder, setProjectNamePlaceholder] = useState('');
    const [projectDescriptionPlaceholder, setProjectDescriptionPlaceholder] = useState('');
    const [projectOwner, setProjectOwner] = useState('');
    const [projectMembers, setProjectMembers] = useState([]);

    // State variables for possible project updates
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    // State variable to active and deactivate add collaborator
    const [addCollab, setAddCollab] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    // State variable to handle search query
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    // Function to handle project name change
    const handleProjectNameChange = (newName) => {
        setProjectName(newName);
    }

    // Function to handle project description change
    const handleProjectDescriptionChange = (newDescription) => {
        setProjectDescription(newDescription);
    }
  
    useEffect(() => {
      // Make a request to the MongoDB server to search for users
      async function fetchUsers() {
        try {
          const response = await axios.get('https://photocode.app:8443/searchUsers', {
            params: {
              username: searchQuery
            }
          });
            // Check if user is already a member of the project
            for (let i = 0; i < response.data.length; i++) {
                for (let j = 0; j < projectMembers.length; j++) {
                    if (response.data[i]._id == projectMembers[j]._id) {
                        response.data[i].connection = 'Member';
                        // response.data[i].connection = 'Member';
                        console.log("Found Repeat");
                    }
                }
            }
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchUsers();
    }, [searchQuery]);

    // Function to handle project update
    const handleProjectNameUpdate = async() => {
        if (projectName == '')
            return;
        props.updateAuth({
            isLoading: true,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
        // Update project information
        const project_id = localStorage.getItem('project_id');
        const response = await axios.post(`http://localhost:3001/updateProject`, {
            project_id: project_id,
            name: projectName,
            description: projectDescriptionPlaceholder,
        });
        props.updateAuth({
            isLoading: false,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
    }

    // Function to handle project update
    const handleProjectDescriptionUpdate = async() => {
        if (projectDescription == '')
            return;
        props.updateAuth({
            isLoading: true,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
        // Update project information
        const project_id = localStorage.getItem('project_id');
        const response = await axios.post(`http://localhost:3001/updateProject`, {
            project_id: project_id,
            name: projectNamePlaceholder,
            description: projectDescription,
        });
        props.updateAuth({
            isLoading: false,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
    }

    // Function to handle adding a collaborator to a project
    const handleInviteCollaborator = async(user) => {
        props.setLoader(true);
        // Update project information
        const project_id = localStorage.getItem('project_id');
        await axios.post(`http://localhost:3001/sendProjectInvite`, {
            email: user.email,
            project_id: project_id,
            project_name: projectNamePlaceholder,
            user_id: user._id,
        })
        .then(() => {
            setAddCollab(false)
            setResponseMessage("Successfully invited user!");
            props.setLoader(false);
        })
        .catch((error) => {
            console.log("Error sending invite");
        });
    }

    // Function to handle removing a collaborator from a project
    const handleRemoveCollaborator = async(user) => {
        props.updateAuth({
            isLoading: true,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
        // Update project information
        const project_id = localStorage.getItem('project_id');
        const response = await axios.get(`http://localhost:3001/removeCollaborator`, {
            params: {
                project_id: project_id,
                user_id: user._id,
            }
        });
        props.updateAuth({
            isLoading: false,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
    }

    useEffect(() => {
        // Get project information
        const project_id = localStorage.getItem('project_id');
        async function getProject() {
            const response = await axios.get(`http://localhost:3001/getProject?project_id=${project_id}`)
            setProjectNamePlaceholder(response.data.name);
            setProjectOwner(response.data.user);
            setProjectDescriptionPlaceholder(response.data.description);
            // Get project collaborators information from users collection and add to projectMembers
            const response2 = await axios.get('https://photocode.app:8443/getCollaborators', {
                params: {
                    project_id: project_id
                }
            })
            setProjectMembers(response2.data);
        }
        getProject().then(() => {
            props.setLoader(false);
        });
    }, [props.auth.isLoading]);

    const handleProjectDelete = async() => {
        props.updateAuth({
            isLoading: true,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
        // Delete folders/files from projects contents
        const project_id = localStorage.getItem('project_id');
        const response = await axios.post('https://photocode.app:8443/deleteFolder', {
            "folder_id": project_id
        })
        .then(
            // Delete project object from projects collection
            axios.post('https://photocode.app:8443/deleteProject', {
                project_id: project_id
            })
        );
        if (response) {
            await props.updateAuth({
                isLoading: false,
                isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
                accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
                idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
            });
            navigate('/Home');
        }
        else
        {
            console.log("FAILED to delete folder");
        }
    }

    const navigate = useNavigate();
    if (props.auth.isLoading) {
        return (
          <LoadingPage />
        )
      } else {
        return (
            <div className='ProjectSettingsContainer'>
                <PhotoCodeHeader setLoader={props.setLoader}/>
                <button className='backButton' onClick={() => navigate(-1)}>{"<-"} back to {projectNamePlaceholder}</button>
                <div className='ProjectSettings'>
                    <div className='ProjectSettingsContentLeft'>
                        <div className='Project-Name-Desc-Section'>
                            <h2 className='projectNameTitle'>Project Name</h2>
                            <div className='ProjectSettingsInformation'>
                                <input 
                                    type='text' 
                                    className='ProjectInput' 
                                    placeholder={projectNamePlaceholder}
                                    onChange={(event) => handleProjectNameChange(event.target.value)}/>
                                <button className='ProjectNameButton' onClick={() => handleProjectNameUpdate()}> Rename</button>
                            </div>
                            <h2>Project Description</h2>
                            <textarea 
                                className='ProjectDescription' 
                                placeholder={projectDescriptionPlaceholder}
                                onChange={(event) => handleProjectDescriptionChange(event.target.value)}
                            />
                            <button className='ProjectDescriptionButton' onClick={() => handleProjectDescriptionUpdate()}>Change Description</button>
                        </div>
                    </div>
                    <div className='ProjectSettingsContentRight'>
                        {(addCollab == true) ? 
                        <div className='AddCollaboratorBox'>
                            <div className='Title-Exit'>
                                <h1 className='addCollaboratorsTitle'>Add Collaborators</h1>
                                <button className='ExitButton' onClick={() => setAddCollab(false)}>X</button>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                placeholder="Search for a user"
                                onChange={event => setSearchQuery(event.target.value)}
                                autoFocus
                            />
                            {users.map(user => (
                                <div className='userFound'>
                                    <div key={user} className='userInfo'>
                                        <h1>
                                            {user.username}
                                        </h1>
                                        <h2>{user.email}</h2>
                                        <h2>{user.connection}</h2>
                                    </div>
                                    {// Check if user is already a collaborator on the project
                                        (user.connection == 'Member') ? <button className='addedCollaboratorButton' disabled>Added</button> :
                                    <button className='addCollaboratorButton' onClick={() => handleInviteCollaborator(user)}>Add</button>}
                                </div>
                            ))}
                        </div> : 
                        <div className='ProjectMemberSection'>
                            <div className='Title-addMember'>
                                <h2>Project Members</h2>
                                <button className='AddMemberButton' onClick={() => setAddCollab(true)}>Add</button>
                            </div>
                            <div className='ProjectMembers'>
                                {Object.keys(projectMembers).map(member => {
                                    return (
                                        <div className='MemberObject'>
                                            <div className='line'></div>
                                            <div  key={member} className='Member'>
                                                <img src={'https://avatars.githubusercontent.com/u/59611677?v=4'} alt='Profile Picture' className='ProfilePicture'/>
                                                <h2>{projectMembers[member].username}</h2>
                                                {(projectOwner == projectMembers[member]._id) ? <h3>Owner</h3> : (localStorage.getItem('user_id') == projectMembers[member]._id) ? <h3>Member</h3> :
                                                    <button className='RemoveMemberButton' onClick={() => handleRemoveCollaborator(projectMembers[member])}>Remove</button>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {(responseMessage != '') ? <h3>{responseMessage}</h3> : <></>}
                        </div>}
                        {(localStorage.getItem('user_id') != projectOwner) ? <></> : <button className='DeleteProjectButton' onClick={() => handleProjectDelete()}>Delete Project</button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectSettings;