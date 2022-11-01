import React from 'react'
import "./FileEdit.css";

import Editor from "@monaco-editor/react";

import {
  FaFileCode,
  FaRegFolderOpen
} from "react-icons/fa";

function File_Edit() {
    var directoryTitle = "PhotoCode App";
    var fileTitle = "index.html";
    const dummyFolders = ["Fonts", "Images"];
    const dummyFiles = ["index.css", "index.html", "ReadMe.md"];
    
  return (
    <div className="container">
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
            <div className="folderDisplay">
              {dummyFolders.map((folder) => {
                return (
                  <div className="folders">
                    <FaRegFolderOpen className="folderIcon"/> 
                    <h1>{folder}</h1>
                  </div>
                  );
                })}
            </div>
            <div className="folderDisplay">
              {dummyFiles.map((file) => {
                return (
                  <div className="folders">
                    {/* <FaFileAlt className="folderIcon"/>  */}
                    <h1>{file}</h1>
                  </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="Edit_Commit">
            <div className="editor">
              <Editor
                height="100%"
                defaultLanguage="HTML"
                options={{
                  fontSize: "20px"}}
                // theme="vs-dark"
                // defaultValue="// some comment"
              />
            </div>
            <div className="commit_information">
                <div className="titleUpdate">
                  <input
                  type="text"
                  className="titleName"
                  placeholder={"Update " + fileTitle}
                  />
                  <button className="updateFile">            
                    Update
                  </button>
                </div>
                  <textarea 
                    className="description"
                    placeholder="Changes made..."  
                  />
            </div>
        </div>
    </div>
  )
}

export default File_Edit;