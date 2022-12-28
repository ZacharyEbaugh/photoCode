import "./ProjectPage.css";
import React,{ useState, useEffect } from 'react'
import axios from "axios";
import { Buffer } from 'buffer';
import fileDownload from 'js-file-download'

import blueFolder from "./../images/blueFolder.png";
import fileIcon from "./../images/file.png";
import newFile from "./../images/newFile.png";
import newFolder from "./../images/newFolder.png";

import { PhotoCodeHeader } from './PhotoCodeHeader';
import { ProjectCommits } from './ProjectCommits';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { MdClear } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";


function ProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [projectName, setProjectName] = useState('');

  const [deleteFile, setDeleteFile] = useState({});
  const [deleteFolder, setDeleteFolder] = useState({});

  // State variables for handling creating a new file
  const [createFile, setCreateFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // State variables for handling creating a new folder
  const [createFolder, setCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // State variables for handling directory and view state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState([]);
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

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  // Get all folders and files from the database for this project
  useEffect(() => {
    // Grab project_id from the header and use it to get all folders and files for this project
    const query = new URLSearchParams(location.search);
    const project_id = query.get('project_id');
    localStorage.setItem('project_id', project_id);
    console.log("ID: " + project_id);
    axios.get(`http://localhost:3001/getFolders?project_id=${project_id}`)
      .then(res => {
        const root_folder_id = res.data[0]._id;
        setProjectName(res.data[0].name);
        res.data[0].name = "root";
        setCurrentPath([...currentPath, res.data[0]]);
        axios.get(`http://localhost:3001/getFolders?project_id=${root_folder_id}`)
        .then(res => {
          console.log(res.data);
          setFolders(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
          console.log(err);
      });
  }, []);

  const updateDirContents = async(folder) => {
    // setCurrentPath([...currentPath, folderName]);

    // Get the folder_id from the folderName
    // Grab the folders and files within the folder that was clicked and change the states to display them
    
    console.log(folder);
    
    const update_folders = await axios.get(`http://localhost:3001/getFolders?project_id=${folder._id}`);
    const files = await axios.get(`http://localhost:3001/getFiles?project_id=${folder._id}`);

    return [update_folders.data, files.data];
  };

  const handleFolderClick = async(folder) => {
    const [update_folders, files] = await updateDirContents(folder);
    setFolders(update_folders);
    setFiles(files);
    setCurrentPath([...currentPath, folder]);
  };

  useEffect(() => {
    // Update the input field whenever the searchQuery state variable changes
    document.getElementById('search-input').value = searchQuery;
  }, [searchQuery]);

  const handleDirPathClick = async(directory, index) => {
    const [update_folders, files] = await updateDirContents(directory);
    setFolders(update_folders);
    setFiles(files);
    setCurrentPath(currentPath.slice(0, index + 1));
    console.log(currentPath);

  };

  const handleDownload = async(file) => {
    console.log(file);
    const response = await axios.get(`http://localhost:3001/getFile?file_id=${file._id}&file_name=${file.filename}`);
    console.log(response.data.fileContents.data);

    const buffer = Buffer.from(response.data.fileContents.data, 'hex')

    const blob = new Blob([buffer], {type: 'application/octet-stream'});
    
    const a = document.createElement('a');
    // Set the href attribute of the link element to the URL for the Blob
    a.href = URL.createObjectURL(blob);
    // Set the download attribute of the link element
    a.download = file.filename;
    // Append the link element to the document
    document.body.appendChild(a);
    // Click the link element to initiate the download
    a.click();
    // Remove the link element from the document
    document.body.removeChild(a);
    
    // fileDownload(response.data, file.name);
  }

  const handleFileDelete = async(file) => {
    console.log(file);
    const response = await axios.post('http://localhost:3001/deleteFile', {
      "file_id": file._id
    });

    if (response)
      setFiles(files.filter(f => f._id !== file._id));
    else
    {
      console.log("FAILED to delete file");
    }
  }

  const handleFolderDelete = async(folder) => {
    const response = await axios.post('http://localhost:3001/deleteFolder', {
    "folder": folder,  
    "folder_id": folder._id
    });

    if (response)
      setFolders(folders.filter(f => f._id !== folder._id));
    else
    {
      console.log("FAILED to delete folder");
    }
  }

  // const currentFolder = currentPath.reduce(
  //   (directory, folderName) => directory[folderName].contents,
  //   directory
  // );

  // const search = (query) => {
  //   // Set the searchQuery state variable to the query argument
  //   setCreateFile(false);
  //   setCreateFolder(false);
  //   setSearchQuery(query);
  // }

  // const handleClear = () => {
  //   setSearchQuery('');
  // }

  // // Flatten the directory structure into a single array of items
  // const allItems = Object.keys(currentFolder).reduce((acc, key) => acc.concat(currentFolder[key]), []);

  // // Use the filter method to search for items matching the search query
  // const searchResults = allItems.filter(item => item.name && item.name.includes(searchQuery));
  
  // const addNewFolder = () => {
  //   setCreateFile(false);
  //   setCreateFolder(true);
  // }

  // const addNewFile = () => {
  //   setCreateFolder(false);
  //   setCreateFile(true);
  // }

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     if (newFolderName == '')
  //       addFile();
  //     else
  //       addFolder();
  //   }
  //   else if (event.key === 'Escape') {
  //     setCreateFile(false);
  //     setCreateFolder(false);
  //   }
  // }

  // const addFolder = () => {
  //   // Handle generating unique file object name
  //   const newFolder = newFolderName;

  //   // Create new file object
  //   const variable = {
  //     [newFolder]: {
  //       type: 'folder',
  //       name: newFolderName,
  //       contents: {}
  //     }
  //   }

  //   // Navigate to current path in directory
  //   let current = directory;
  //   currentPath.forEach(path => {
  //     if (path === 'root')
  //       current = current[path];
  //     else
  //       current = current.contents[path];
  //   });
  //   current.contents = {
  //     ...current.contents,
  //     [newFolder]: variable[newFolder]
  //   }
  //   setDirectory(directory);
  //   setCreateFolder(false);
  //   setNewFolderName('');
  //   // console.log(directory);
  // }

  // const addFile = () => {
  //   // Handle language extention and image
  //   var extention = newFileName.split('.').pop();
  //   var language = '';
  //   var languageImage = '';
  //   switch (extention) {
  //     case 'html':
  //       language = 'html';
  //       languageImage = 'https://img.icons8.com/color/48/000000/html-5.png';
  //       break;
  //     case 'css':
  //       language = 'css';
  //       languageImage = 'https://img.icons8.com/color/48/000000/css3.png';
  //       break;
  //     case 'js':
  //       language = 'JavaScript';
  //       languageImage = 'https://img.icons8.com/color/48/000000/javascript.png';
  //       break;
  //     case 'py':
  //       language = 'Python';
  //       languageImage = 'https://img.icons8.com/color/48/000000/python.png';
  //       break;
  //     case 'php':
  //       language = 'PHP';
  //       languageImage = 'https://img.icons8.com/color/48/000000/php.png';
  //       break;
  //     case 'java':
  //       language = 'Java';
  //       languageImage = 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png';
  //       break;
  //     case 'c':
  //       language = 'C';
  //       languageImage = 'https://img.icons8.com/color/48/000000/c-programming.png';
  //       break;
  //     case 'cpp':
  //       language = 'C++';
  //       languageImage = 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png';
  //       break;
  //     case 'cs':
  //       language = 'C#';
  //       languageImage = 'https://img.icons8.com/color/48/000000/c-sharp-logo.png';
  //       break;
  //     case 'go':
  //       language = 'Go';
  //       languageImage = 'https://img.icons8.com/color/48/000000/golang.png';
  //       break;
  //     case 'swift':
  //       language = 'Swift';
  //       languageImage = 'https://img.icons8.com/color/48/000000/swift.png';
  //       break;
  //     case 'kt':
  //       language = 'Kotlin';
  //       languageImage = 'https://img.icons8.com/color/48/000000/kotlin.png';
  //       break;
  //     case 'rb':
  //       language = 'Ruby';
  //       languageImage = 'https://img.icons8.com/color/48/000000/ruby-programming-language.png';
  //       break;
  //     case 'sql':
  //       language = 'SQL';
  //       languageImage = 'https://img.icons8.com/color/48/000000/sql.png';
  //       break;
  //     case 'json':
  //       language = 'JSON';
  //       languageImage = 'https://img.icons8.com/color/48/000000/json.png';
  //       break;
  //     case 'xml':
  //       language = 'XML';
  //       languageImage = 'https://img.icons8.com/color/48/000000/xml-file.png';
  //       break;
  //     default:
  //       language = 'text';
  //       languageImage = fileIcon;
  //   }

  //   // Handle generating unique file object name
  //   const newFile = newFileName;

  //   // Create new file object
  //   const variable = {
  //     [newFile]: {
  //       type: 'file',
  //       name: newFileName,
  //       language: language,
  //       languageImage: languageImage
  //     }
  //   }
  
  //   // Navigate to current path in directory
  //   let current = directory;
  //   currentPath.forEach(path => {
  //     if (path === 'root')
  //       current = current[path];
  //     else
  //       current = current.contents[path];
  //   });

  //   // Add new file object to directory
  //   current.contents = {
  //     ...current.contents,
  //     [newFile]: variable[newFile]
  //   }

  //   // Update directory state
  //   setDirectory(directory);
  //   setCreateFile(false);
  //   setNewFileName('');
  // }

  // useEffect(() => {
  //   const deleteFile = (deleteFileName) => {
  //     let current = directory;
  //     currentPath.forEach(path => {
  //       if (path === 'root')
  //         current = current[path];
  //       else
  //         current = current.contents[path];
  //     });
  //     delete current.contents[deleteFileName];
  //     setDirectory(directory);
  //     setDeleteFileName('');
  //   }
  //   deleteFile(deleteFileName);
  // }, [deleteFileName]);

  // useEffect(() => {
  //   const deleteFolder = (deleteFolderName) => {
  //     // console.log(deleteFolderName);
  //     let current = directory;
  //     // console.log(currentPath);
  //     currentPath.forEach(path => {
  //       if (path === 'root')
  //         current = current[path];
  //       else
  //         current = current.contents[path];
  //     });
  //     delete current.contents[deleteFolderName];
  //     setDirectory(directory);
  //     setDeleteFolderName('');
  //   }
  //   deleteFolder(deleteFolderName);
  //   // console.log(directory);
  // }, [deleteFolderName]);

  return (
    <div className="ProjectPageContainer">
        <PhotoCodeHeader />
        <div className="directory-commits">
          <div className="dirBlock">
            <h1>{projectName}</h1>
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
              {currentPath.map((folder, index) => (
                (currentPath.length > 0) ? <span className="dirPathButton" key={folder}>
                  <a onClick={() => handleDirPathClick(folder, index)}>
                    <h1>
                      {/* {(currentPath.length - 1 > 0) ? folder : ''}
                      {index < currentPath.length - 1 ? '/' : ''} */}
                      {folder.name}/
                    </h1>
                  </a>
                </span>
              : <></>))}
            </div>
            <div className="folderDisplay">

                {Object.entries((searchQuery === '') ? folders : searchResults).map(([key, folder]) => (
                  <button className='goToFolder'>
                    <div className="line"></div>
                    <div className="folders" key={key}  onClick={() => handleFolderClick(folder)}>
                      <img src={blueFolder} alt="blue folder" className="folderIcon"/>
                      <h1>
                        {folder.name}
                      </h1>
                      
                    </div>
                    <HiOutlineDownload
                      className="downloadButton"
                      // onClick={() => handleDownload(folder)}
                    />
                    <RiDeleteBin7Fill
                      className="deleteButton"
                      onClick={() => handleFolderDelete(folder)}
                    />
                  </button>
                ))}
                {Object.entries((searchQuery === '') ? files : searchResults).map(([key, file]) => (
                  <button className='goToFolder'>
                    <div className="line"></div>
                    <div className="folders" key={file._id}  onClick={() => navigate('/FileEdit?file_id=' + file._id + '&file_name=' + file.filename)}>
                      <img src={fileIcon} alt="blue folder" className="folderIcon"/>
                      <h1>
                        {file.filename}
                      </h1>
                      
                    </div>
                    <HiOutlineDownload
                      className="downloadButton"
                      onClick={() => handleDownload(file)}
                    />
                    <RiDeleteBin7Fill
                      className="deleteButton"
                      onClick={() => handleFileDelete(file)}
                    />
                  </button>
                ))}


              {/* {Object.entries((searchQuery === '') ? currentFolder : searchResults).map(([key, value]) =>
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
              )} */}
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