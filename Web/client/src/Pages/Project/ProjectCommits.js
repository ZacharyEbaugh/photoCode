import React, { useEffect, useState } from 'react';
import './ProjectCommits.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


export function ProjectCommits() {
    const location = useLocation();
    const [showMessage, setShowMessage] = useState({});
    const [commits, setCommits] = useState([]);
    
    useEffect(() => {
        console.log(localStorage.getItem('project_id'));
        // Make axios call to get commits for project using project_id
<<<<<<< Updated upstream
        axios.post('https://photocode.app/getAllCommits', {
=======
        axios.post('https://photocode.app:8443/getAllCommits', {
>>>>>>> Stashed changes
            project_id: localStorage.getItem('project_id')
        }).then((response) => {
            setCommits(response.data.reverse());
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="commitsBox">
            <h1>Updates</h1>
            {commits.map((commit, index) => {
                const className = (index === commits.length - 1) ? 'commitGeneralInfoLast' : 'commitGeneralInfo';
                return (
                <div className="commits" key={index} onClick={() => {setShowMessage({ ...showMessage, [index]: !showMessage[index]})}}>
                    <div className={className}>
                        <img src={commit.picture} alt="commit author" className="commitAuthorImage" referrerpolicy="no-referrer"/>
                        <h1>{commit.title}</h1>
                        <div className='commitTime'>
                            <h1>{(commit.date).split('T')[0]}</h1>
                            <h1>{(commit.date).split('T')[1].split('.')[0]}</h1>
                        </div>
                    </div>
                    {showMessage[index] && 
                        <h2>
                            {commit.message}
                        </h2>
                    }
                </div>
                );
            })}
        </div>
    );
}
