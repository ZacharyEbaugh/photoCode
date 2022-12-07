import "./ProjectPage.css";
import React from 'react'

import Editor from "@monaco-editor/react";

import blueFolder from "./../images/blueFolder.png";
import fileIcon from "./../images/file.png";
import newFile from "./../images/newFile.png";
import newFolder from "./../images/newFolder.png";

import { PhotoCodeHeader } from './PhotoCodeHeader';
import { ProjectCommits } from './ProjectCommits';
import { useNavigate } from "react-router-dom";

function File_Edit() {
    const navigate = useNavigate();

    var directoryTitle = "PhotoCode App";
    var fileTitle = "index.html";
    const dummyFolders = ["Fonts", "Images"];
    const dummyFiles = ["index.css", "index.html", "ReadMe.md"];
    
  return (
    <div className="ProjectPageContainer">
        <PhotoCodeHeader />
        <div className="directory-commits">
          <div className="dirBlock">
            <h1>{directoryTitle}</h1>
            <div className="create_search_file">
              <button className="createFile">            
                <img src={newFolder} alt="new folder" className="folderIcon"/> 
              </button>
              <button className="createFile">            
                <img src={newFile} alt="new file" className="fileIcon"/>
              </button>

              <input
                type="text"
                className="searchFile"
                placeholder="Search Files"
              />
            </div>
            <div className="folderDisplay">
              {dummyFolders.map((folder) => {
                return (
                  <div className="folders">
                    <img src={blueFolder} alt="blue folder" className="folderIcon"/>
                    <h1>{folder}</h1>
                  </div>
                  );
                })}
            </div>
            <div className="folderDisplay">
              {dummyFiles.map((file) => {
                return (
                  <div className="folders">
                    <img src={fileIcon} alt="file" className="fileIcon"/>
                    <h1>{file}</h1>
                  </div>
                  );
                })}
            </div>
          </div>
          <div className="settings-commits">
            <div className="settingsButton" onClick={() => navigate('./ProjectSettings')}>Project Settings</div>
            <ProjectCommits/>
          </div>
        </div>
        
    </div>
  )
}

export default File_Edit;