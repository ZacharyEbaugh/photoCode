import './ProjectSettings.css';
import React from 'react';
import { PhotoCodeHeader } from './PhotoCodeHeader';

import { useNavigate } from 'react-router-dom';

function ProjectSettings() {

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
                            <input type='text' className='ProjectInput' placeholder='Project Name'/>
                            <button className='ProjectNameButton'> Rename</button>
                        </div>
                        <h2>Project Description</h2>
                        <textarea 
                            className='ProjectDescription' 
                            placeholder='Project Description'
                        />
                        <button className='ProjectDescriptionButton'>Change Description</button>
                    </div>
                </div>
                <div className='ProjectSettingsContentRight'>
                    <div className='ProjectMemberSection'>
                        <div className='Title-addMember'>
                            <h2>Project Members</h2>
                            <button className='AddMemberButton'>Add</button>
                        </div>
                        <div className='ProjectMembers'>
                            {Object.keys(members).map(member => {
                                return (
                                    
                                    <div className='MemberObject'>
                                        <div className='line'></div>
                                        <div className='Member'>
                                            <img src={members[member].profilePicture} alt='Profile Picture' className='ProfilePicture'/>
                                            <h2>{members[member].name}</h2>
                                            <button className='RemoveMemberButton'>Remove</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectSettings;