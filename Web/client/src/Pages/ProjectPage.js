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

import { MdClear } from "react-icons/md";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";


function ProjectPage() {
    const navigate = useNavigate();
    var directoryTitle = "PhotoCode App";

    const [deleteFileName, setDeleteFileName] = useState('');
    const [deleteFolderName, setDeleteFolderName] = useState('');

    // State variables for handling creating a new file
    const [createFile, setCreateFile] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    // State variables for handling creating a new folder
    const [createFolder, setCreateFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    // State variables for handling directory and view state
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
            },
            file: {
              type: 'file',
              name: 'tests',
              language: '',
              languageImage: 'https://img.icons8.com/color/48/000000/php.png',
            },
          }
        },
        'fileOuter.py': {
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
    console.log(currentPath);
    setSearchQuery('');
    setCreateFile(false);
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
    setCreateFile(false);
    setCreateFolder(false);
    setSearchQuery(query);
  }

  const handleClear = () => {
    setSearchQuery('');
  }

  // Flatten the directory structure into a single array of items
  const allItems = Object.keys(currentFolder).reduce((acc, key) => acc.concat(currentFolder[key]), []);

  // Use the filter method to search for items matching the search query
  const searchResults = allItems.filter(item => item.name && item.name.includes(searchQuery));
  
  const addNewFolder = () => {
    setCreateFile(false);
    setCreateFolder(true);
  }

  const addNewFile = () => {
    setCreateFolder(false);
    setCreateFile(true);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newFolderName == '')
        addFile();
      else
        addFolder();
    }
    else if (event.key === 'Escape') {
      setCreateFile(false);
      setCreateFolder(false);
    }
  }

  const addFolder = () => {
    // Handle generating unique file object name
    const newFolder = newFolderName;

    // Create new file object
    const variable = {
      [newFolder]: {
        type: 'folder',
        name: newFolderName,
        contents: {}
      }
    }

    // Navigate to current path in directory
    let current = directory;
    currentPath.forEach(path => {
      if (path === 'root')
        current = current[path];
      else
        current = current.contents[path];
    });
    current.contents = {
      ...current.contents,
      [newFolder]: variable[newFolder]
    }
    setDirectory(directory);
    setCreateFolder(false);
    setNewFolderName('');
    console.log(directory);
  }

  const addFile = () => {
    // Handle language extention and image
    var extention = newFileName.split('.').pop();
    var language = '';
    var languageImage = '';
    switch (extention) {
      case 'html':
        language = 'html';
        languageImage = 'https://img.icons8.com/color/48/000000/html-5.png';
        break;
      case 'css':
        language = 'css';
        languageImage = 'https://img.icons8.com/color/48/000000/css3.png';
        break;
      case 'js':
        language = 'JavaScript';
        languageImage = 'https://img.icons8.com/color/48/000000/javascript.png';
        break;
      case 'py':
        language = 'Python';
        languageImage = 'https://img.icons8.com/color/48/000000/python.png';
        break;
      case 'php':
        language = 'PHP';
        languageImage = 'https://img.icons8.com/color/48/000000/php.png';
        break;
      case 'java':
        language = 'Java';
        languageImage = 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png';
        break;
      case 'c':
        language = 'C';
        languageImage = 'https://img.icons8.com/color/48/000000/c-programming.png';
        break;
      case 'cpp':
        language = 'C++';
        languageImage = 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png';
        break;
      case 'cs':
        language = 'C#';
        languageImage = 'https://img.icons8.com/color/48/000000/c-sharp-logo.png';
        break;
      case 'go':
        language = 'Go';
        languageImage = 'https://img.icons8.com/color/48/000000/golang.png';
        break;
      case 'swift':
        language = 'Swift';
        languageImage = 'https://img.icons8.com/color/48/000000/swift.png';
        break;
      case 'kt':
        language = 'Kotlin';
        languageImage = 'https://img.icons8.com/color/48/000000/kotlin.png';
        break;
      case 'rb':
        language = 'Ruby';
        languageImage = 'https://img.icons8.com/color/48/000000/ruby-programming-language.png';
        break;
      case 'sql':
        language = 'SQL';
        languageImage = 'https://img.icons8.com/color/48/000000/sql.png';
        break;
      case 'json':
        language = 'JSON';
        languageImage = 'https://img.icons8.com/color/48/000000/json.png';
        break;
      case 'xml':
        language = 'XML';
        languageImage = 'https://img.icons8.com/color/48/000000/xml-file.png';
        break;
      default:
        language = 'text';
        languageImage = fileIcon;
    }

    // Handle generating unique file object name
    const newFile = newFileName;

    // Create new file object
    const variable = {
      [newFile]: {
        type: 'file',
        name: newFileName,
        language: language,
        languageImage: languageImage
      }
    }
  
    // Navigate to current path in directory
    let current = directory;
    currentPath.forEach(path => {
      if (path === 'root')
        current = current[path];
      else
        current = current.contents[path];
    });

    // Add new file object to directory
    current.contents = {
      ...current.contents,
      [newFile]: variable[newFile]
    }

    // Update directory state
    setDirectory(directory);
    setCreateFile(false);
    setNewFileName('');
  }


  useEffect(() => {
    const deleteFile = (deleteFileName) => {
      let current = directory;
      currentPath.forEach(path => {
        if (path === 'root')
          current = current[path];
        else
          current = current.contents[path];
      });
      delete current.contents[deleteFileName];
      setDirectory(directory);
      setDeleteFileName('');
    }
    deleteFile(deleteFileName);
  }, [deleteFileName]);

  useEffect(() => {
    const deleteFolder = (deleteFolderName) => {
      console.log(deleteFolderName);
      let current = directory;
      console.log(currentPath);
      currentPath.forEach(path => {
        if (path === 'root')
          current = current[path];
        else
          current = current.contents[path];
      });
      delete current.contents[deleteFolderName];
      setDirectory(directory);
      setDeleteFolderName('');
    }
    deleteFolder(deleteFolderName);
    console.log(directory);
  }, [deleteFolderName]);

  return (
    <div className="ProjectPageContainer">
        <PhotoCodeHeader />
        <div className="directory-commits">
          <div className="dirBlock">
            <h1>{directoryTitle}</h1>
            <div className="create_search_file">
              <button className="createFile" onClick={() => addNewFolder()}>            
                <img src={newFolder} alt="new folder" className="newFolderButtonIcon"/> 
              </button>
              <button className="createFile" onClick={() => addNewFile()}>            
                <img src={newFile} alt="new file" className="newFileButtonIcon"/>
              </button>
              <div className="searchBar">
                <input
                  type="text"
                  id="search-input"
                  className="searchFile"
                  placeholder="Search Files"
                  onChange={event => search(event.target.value)}
                />
                {(searchQuery != '') && <button className="clearSearch" onClick={handleClear}>
                  <MdClear 
                    className="clearIcon"
                  />
                </button>}
              </div>
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
                  <button className='goToFolder'>
                    <div className="line"></div>
                    <div className="folders" key={key}  onClick={() => handleFolderClick(value.name)}>
                      <img src={blueFolder} alt="blue folder" className="folderIcon"/>
                      <h1>
                        {value.name}
                      </h1>
                      
                    </div>
                    <RiDeleteBin7Fill
                      className="deleteButton"
                      onClick={() => setDeleteFolderName(value.name)}
                    />
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
                    <RiDeleteBin7Fill
                        className="deleteButton"
                        onClick={() => setDeleteFileName(value.name)}
                      />
                  </button>
                )
              )}
              {(createFile) && <button className="newFileInput">
                <div className="line"></div>
                <div className="newFile">
                  <img src={fileIcon} alt="language" className="folderIcon"/>
                  <input 
                    type="text" 
                    className="fileNameInput" 
                    placeholder="New File Name"
                    onChange={(event) => {setNewFileName(event.target.value)}}
                    onKeyDown={(event) => {handleKeyDown(event)}}
                  />
                </div>
              </button>}
              {(createFolder) && <button className="newFileInput">
                <div className="line"></div>
                <div className="newFile">
                  <img src={fileIcon} alt="language" className="folderIcon"/>
                  <input 
                    type="text" 
                    className="fileNameInput" 
                    placeholder="New Folder Name"
                    onChange={(event) => {setNewFolderName(event.target.value)}}
                    onKeyDown={(event) => {handleKeyDown(event)}}
                  />
                </div>
              </button>}
            </div>
          </div>
          <div className="settings-commits">
            <div className="settingsButton" onClick={() => navigate('/ProjectSettings')}>Project Settings</div>
            <ProjectCommits/>
          </div>
        </div>
    </div>
  )
}

export default ProjectPage;