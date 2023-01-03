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
        axios.post('http://localhost:3001/getAllCommits', {
            project_id: localStorage.getItem('project_id')
        }).then((response) => {
            setCommits(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="commitsBox">
            <h1>Updates</h1>
            {Object.keys(commits).map(key => (
                <div className="commits" key={key} onClick={() => setShowMessage({ ...showMessage, [key]: !showMessage[key]})}>
                    <div className='commitGeneralInfo'>
                        <img src={commits[key].picture} alt="commit author" className="commitAuthorImage"/>
                        <h1>{commits[key].title}</h1>
                        <div className='commitTime'>
                            <h1>{(commits[key].date).split('T')[0]}</h1>
                            <h1>{(commits[key].date).split('T')[1].split('.')[0]}</h1>
                        </div>
                    </div>
                    {showMessage[key] && 
                        <h2>
                            {commits[key].message}
                        </h2>
                    }
                </div>
            ))}
        </div>
    );
}
