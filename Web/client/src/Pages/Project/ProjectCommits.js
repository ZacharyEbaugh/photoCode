import React, { useState } from 'react';
import './ProjectCommits.css';



export function ProjectCommits() {

    const [showMessage, setShowMessage] = useState({});

    const dummyCommits = {
        "commit1": {
            "commitTitle": "Added a new file",
            "commitMessage": "Added a new file",
            "commitDate": "2021-05-01",
            "commitTime": "12:00:00",
            "commitAuthor": "John Doe",
                        "commitAuthorImage": "https://www.w3schools.com/howto/img_avatar.png",

        },
        "commit2": {
            "commitTitle": "Deleted files",
            "commitMessage": "Added a new file",
            "commitDate": "2021-05-01",
            "commitTime": "12:00:00",
            "commitAuthor": "John Doe",
                        "commitAuthorImage": "https://www.w3schools.com/howto/img_avatar.png",

        },
        "commit3": {
            "commitTitle": "added routing from home to file edit page",
            "commitMessage": "Added a new file",
            "commitDate": "2021-05-01",
            "commitTime": "12:00:00",
            "commitAuthor": "John Doe",
            "commitAuthorImage": "https://www.w3schools.com/howto/img_avatar.png",

        },
        "commit4": {
            "commitTitle": "modified index.js file",
            "commitMessage": "Added a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new fileAdded a new file",
            "commitDate": "2021-05-01",
            "commitTime": "12:00:00",
            "commitAuthor": "John Doe",
            "commitAuthorImage": "https://www.w3schools.com/howto/img_avatar.png",
        }
    };

    return (
        <div className="commitsBox">
            <h1>Commits</h1>
            {Object.keys(dummyCommits).map(key => (
                <div className="commits" key={key} onClick={() => setShowMessage({ ...showMessage, [key]: !showMessage[key]})}>
                    <div className='commitGeneralInfo'>
                        <img src={dummyCommits[key].commitAuthorImage} alt="commit author" className="commitAuthorImage"/>
                        <h1>{dummyCommits[key].commitTitle}</h1>
                        <div className='commitTime'>
                            <h1>{dummyCommits[key].commitDate}</h1>
                            <h1>{dummyCommits[key].commitTime}</h1>
                        </div>
                    </div>
                    {showMessage[key] && 
                        <h2>
                            {dummyCommits[key].commitMessage}
                        </h2>
                    }
                </div>
            ))}
        </div>
    );
}
