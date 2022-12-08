import React,{ useState } from 'react'
import "./FileEdit.css";

import Editor from "@monaco-editor/react";

import {
  FaFileCode,
  FaRegFolderOpen
} from "react-icons/fa";
import { PhotoCodeHeader } from './PhotoCodeHeader';

function File_Edit() {
  const directoryTitle = "PhotoCode App";
  var fileTitle = "index.html";

  const [directory, setDirectory] = useState({
    root: {
      type: 'folder',
      name: 'directoryTitle',
      contents: {
        folder1: {
          type: 'folder',
          name: 'folder1',
          language: 'html',
          languageImage: 'https://img.icons8.com/color/48/000000/html-5.png',
          contents: {
            file1: {
              type: 'file',
              name: 'file1',
              language: 'css',
              languageImage: 'https://img.icons8.com/color/48/000000/css3.png',
            },
            file2: {
              type: 'file',
              name: 'file2',
              language: 'JavaScript',
              languageImage: 'https://img.icons8.com/color/48/000000/javascript.png',
            }
          }
        },
        folder2: {
          type: 'folder',
          name: 'folder2',
          contents: {
            file3: {
              type: 'file',
              name: 'file3',
              language: 'JavaScript',
              languageImage: 'https://img.icons8.com/color/48/000000/css3.png',
            },
            file4: {
              type: 'file',
              name: 'file4',
              language: 'PHP',
              languageImage: 'https://img.icons8.com/color/48/000000/php.png',
            }
          }
        },
        fileOuter: {
          type: 'file',
          name: 'fileOuter.py',
          language: 'Python',
          languageImage: 'https://img.icons8.com/color/48/000000/python.png',
        },
      }
    }
  });

  const [currentPath, setCurrentPath] = useState(['root']);

  const handleFolderClick = folderName => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleBreadcrumbClick = breadcrumbIndex => {
    setCurrentPath(currentPath.slice(0, breadcrumbIndex + 1));
  };

  const currentFolder = currentPath.reduce(
    (directory, folderName) => directory[folderName].contents,
    directory
  );

  return (
    <div className="containerFileEdit">
      <PhotoCodeHeader/>
      <div className="containerProject">
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
        {/* Needs language selector */}
        <div className="Edit_Commit">
            <div className="editor">
              <Editor
                height="60vh"
                defaultLanguage="HTML"
                options={{
                  fontSize: 20,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
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
  </div>
  )
}

export default File_Edit;