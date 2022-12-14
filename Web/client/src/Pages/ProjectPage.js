import "./ProjectPage.css";
import React,{ useState, useEffect } from 'react'

import Editor from "@monaco-editor/react";

import blueFolder from "./../images/blueFolder.png";
import fileIcon from "./../images/file.png";
import newFile from "./../images/newFile.png";
import newFolder from "./../images/newFolder.png";

import { PhotoCodeHeader } from './PhotoCodeHeader';
import { ProjectCommits } from './ProjectCommits';
import { useNavigate } from "react-router-dom";

function ProjectPage() {
    const navigate = useNavigate();

    var directoryTitle = "PhotoCode App";
    var fileTitle = "index.html";
    const dummyFolders = ["Fonts", "Images"];
    const dummyFiles = ["index.css", "index.html", "ReadMe.md"];


    const [searchQuery, setSearchQuery] = useState('');
    const [currentPath, setCurrentPath] = useState(['root']);
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
            folder7: {
              type: 'folder',
              name: 'folder7',
              contents: {
                folder8: {
                  type: 'folder',
                  name: 'folder8',
                  contents: {
                  }
                }
              }
            },
            file3: {
              type: 'file',
              name: 'file3',
              language: 'JavaScript',
              languageImage: 'https://img.icons8.com/color/48/000000/css3.png',
            },
            file4: {
              type: 'file',
              name: 'index.html',
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


  const handleFolderClick = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
    setSearchQuery('');
    console.log("TEST" + searchQuery);
  };

  useEffect(() => {
    // Update the input field whenever the searchQuery state variable changes
    document.getElementById('search-input').value = searchQuery;
  }, [searchQuery]);

  const handleBreadcrumbClick = breadcrumbIndex => {
    setCurrentPath(currentPath.slice(0, breadcrumbIndex + 1));
  };

  const currentFolder = currentPath.reduce(
    (directory, folderName) => directory[folderName].contents,
    directory
  );

  const search = (query) => {
    // Set the searchQuery state variable to the query argument
    setSearchQuery(query);
    console.log(currentFolder);
    console.log(searchResults);
  }



  // Flatten the directory structure into a single array of items
  const allItems = Object.keys(currentFolder).reduce((acc, key) => acc.concat(currentFolder[key]), []);

  // const allItems = flatten(directory);

  // Use the filter method to search for items matching the search query
  const searchResults = allItems.filter(item => item.name && item.name.includes(searchQuery));
  

  return (
    <div className="ProjectPageContainer">
        <PhotoCodeHeader />
        <div className="directory-commits">
          <div className="dirBlock">
            <h1>{directoryTitle}</h1>
            <div className="create_search_file">
              <button className="createFile">            
                <img src={newFolder} alt="new folder" className="newFolderButtonIcon"/> 
              </button>
              <button className="createFile">            
                <img src={newFile} alt="new file" className="newFileButtonIcon"/>
              </button>

              <input
                type="text"
                id="search-input"
                className="searchFile"
                placeholder="Search Files"
                onChange={event => search(event.target.value)}
              />
            </div>
             <div className="dirPath">
              {currentPath.map((folderName, index) => (
                (currentPath.length - 1 > 0) ? <span className="dirPathButton" key={folderName}>
                  <a onClick={() => handleBreadcrumbClick(index)}>
                    {/* This is the directory path and the way to go back a dir */}
                    <h1>
                      {(currentPath.length - 1 > 0) ? folderName : ''}
                      {index < currentPath.length - 1 ? '/' : ''}
                    </h1>
                  </a>
                </span>
              : <></>))}
            </div>
            <div className="folderDisplay">
              {Object.entries((searchQuery === '') ? currentFolder : searchResults).map(([key, value]) =>
                value.type === 'folder' ? (
                  <button className='goToFolder' onClick={() => handleFolderClick(value.name)}>
                    <div className="line"></div>
                    <div className="folders" key={key}>
                    <img src={blueFolder} alt="blue folder" className="folderIcon"/>
                      <h1>
                        {value.name}
                      </h1>
                    </div>
                  </button>
                ) : (
                  <button className='goToFile'>
                    <div className="line"></div>
                    <div className='folders' key={key}>
                      <img src={value.languageImage} alt="language" className="languageIcon"/>
                      <h1>
                        {value.name}
                      </h1>
                    </div>
                  </button>
                )
              )}
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

export default ProjectPage;