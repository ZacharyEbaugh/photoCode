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
          <div className="directory">
          <div className="dirBlock">
            <h1>{directoryTitle}</h1>
            <div className="create_search_file">
              <button className="createFile">            
                <FaFileCode className="fileIcon"/> 
              </button>
              <input
                type="text"
                className="searchFile"
                placeholder="Search Files"
              />
            </div>
            <div className="dirPath">
              {currentPath.map((folderName, index) => (
                <span className="dirPathButton" key={folderName}>
                  <a onClick={() => handleBreadcrumbClick(index)}>
                    {/* This is the directory path and the way to go back a dir */}
                    <h1>
                      {(folderName == "root") ? directoryTitle : folderName}
                      {index < currentPath.length - 1 ? '/' : ''}
                    </h1>
                  </a>
                </span>
              ))}
            </div>
            <div className="folderDisplay">
              {Object.entries(currentFolder).map(([key, value]) =>
                value.type === 'folder' ? (
                  <a onClick={() => handleFolderClick(key)}>

                    <div className="folders" key={key}>
                      <FaRegFolderOpen className="folderIcon"/> 
                      <h1>
                        {value.name}
                      </h1>
                    </div>
                  </a>
                ) : (
                  <div className='folders' key={key}>
                    <img src={value.languageImage} alt="language" className="languageIcon"/>
                    <h1>
                      {value.name}
                    </h1>
                  </div>
                )
              )}
            </div>
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