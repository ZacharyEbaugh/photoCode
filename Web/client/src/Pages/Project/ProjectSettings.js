import './ProjectSettings.css';
import React, { useEffect, useState } from 'react';
import { PhotoCodeHeader } from '.././PhotoCodeHeader';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProjectSettings(props) {
    // State variables for project information
    const [projectNamePlaceholder, setProjectNamePlaceholder] = useState('');
    const [projectDescriptionPlaceholder, setProjectDescriptionPlaceholder] = useState('');
    const [projectMembers, setProjectMembers] = useState([]);

    // State variables for possible project updates
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    // Function to handle project name change
    const handleProjectNameChange = (newName) => {
        setProjectName(newName);
    }

    // Function to handle project description change
    const handleProjectDescriptionChange = (newDescription) => {
        setProjectDescription(newDescription);
    }

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
        console.log(response);
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
            console.log(response);
            props.updateAuth({
                isLoading: false,
                isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
                accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
                idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
            });
        }

    const members = {
        member1: {
            name: 'John Doe',
            profilePicture: 'https://avatars.githubusercontent.com/u/59611677?v=4'
        },
        member2: {
            name: 'Jane Doe',
            profilePicture: 'https://avatars.githubusercontent.com/u/59611677?v=4'
        },
        member3: {
            name: 'John Doe',
            profilePicture: 'https://avatars.githubusercontent.com/u/59611677?v=4'
        },
    }

    useEffect(() => {
        // Get project information
        const project_id = localStorage.getItem('project_id');
        const response = axios.get(`http://localhost:3001/getProject?project_id=${project_id}`)
        .then((response) => {
            setProjectNamePlaceholder(response.data.name);
            setProjectDescriptionPlaceholder(response.data.description);
            // setProjectMembers(response.data.members);
            // Get project collaborators information from users collection and add to projectMembers
            axios.get('http://localhost:3001/getCollaborators', {
                params: {
                    project_id: project_id
                }
            })
            .then((response) => {
                setProjectMembers(response.data);
                console.log(response.data);
            }
            );
        });

    
    }, []);



    const handleProjectDelete = async() => {
        props.updateAuth({
            isLoading: true,
            isAuthenticated: localStorage.getItem('access_token') != null ? true : false,
            accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
            idToken: localStorage.getItem('id_token') != null ? localStorage.getItem('id_token') : null,
        });
        // Delete folders/files from projects contents
        const project_id = localStorage.getItem('project_id');

        const response = await axios.post('http://localhost:3001/deleteFolder', {
            "folder_id": project_id
        })
        .then(
            // Delete project object from projects collection
            axios.post('http://localhost:3001/deleteProject', {
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
    return (
        <div className='ProjectSettingsContainer'>
            <PhotoCodeHeader/>
            <button className='backButton' onClick={() => navigate(-1)}>{"<-"} Back to project</button>
            <div className='ProjectSettings'>
                <div className='ProjectSettingsContentLeft'>
                    <div className='Project-Name-Desc-Section'>
                        <h2>Project Name</h2>
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
                    <div className='ProjectMemberSection'>
                        <div className='Title-addMember'>
                            <h2>Project Members</h2>
                            <button className='AddMemberButton'>Add</button>
                        </div>
                        <div className='ProjectMembers'>
                            {Object.keys(projectMembers).map(member => {
                                return (
                                    <div key={member} className='MemberObject'>
                                        <div className='line'></div>
                                        <div className='Member'>
                                            <img src={'https://avatars.githubusercontent.com/u/59611677?v=4'} alt='Profile Picture' className='ProfilePicture'/>
                                            <h2>{projectMembers[member].username}</h2>
                                            <button className='RemoveMemberButton'>Remove</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button className='DeleteProjectButton' onClick={() => handleProjectDelete()}>Delete Project</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectSettings;