import React,{ useState } from 'react'
import "./FileEdit.css";

import Editor from "@monaco-editor/react";

import {
  FaFileCode,
  FaRegFolderOpen
} from "react-icons/fa";
import { PhotoCodeHeader } from './PhotoCodeHeader';

function File_Edit() {
    var directoryTitle = "PhotoCode App";
    var fileTitle = "index.html";
    const dummyFolders = ["Fonts", "Images"];
    const dummyFiles = ["index.css", "index.html", "ReadMe.md"];
    const fileName = "index.html";


  return (
    <div className="container">
      <PhotoCodeHeader/>
      <div className="Edit_Commit">
        <div className='File'>
          <div className="editor">
            <h1 className="fileTitle">
              Editing {fileTitle}
            </h1>
            <Editor
              height="80%"
              defaultLanguage="HTML"
              options={{
                fontSize: "20px"}}
              // theme="vs-dark"
              // defaultValue="// some comment"
            />
          </div>
      
          </div>
          <div className="commit_information">
              <input
              type="text"
              className="titleName"
              placeholder={"Update " + fileTitle}
              />
              <textarea 
                className="description"
                placeholder="Changes made..."  
              />
              <button className="updateFile">            
                  Update File
              </button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default File_Edit;