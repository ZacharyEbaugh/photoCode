import "./ProjectPage.css";
import React,{ useState, useEffect } from 'react'
import axios from "axios";
import { Buffer } from 'buffer';
import fileDownload from 'js-file-download'

import blueFolder from "../.././images/blueFolder.png";
import fileIcon from "../.././images/file.png";
import newFile from "../.././images/newFile.png";
import newFolder from "../.././images/newFolder.png";

import { PhotoCodeHeader } from '.././PhotoCodeHeader';
import { ProjectCommits } from './ProjectCommits';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { MdClear } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";
import LoadingPage from "../LoadingPage";

function ProjectPage(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [projectName, setProjectName] = useState('');

  // State variables for handling creating a new file
  const [createFile, setCreateFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // State variables for handling creating a new folder
  const [createFolder, setCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // State variables for handling directory and view state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFoldersResults, setSearchFoldersResults] = useState([]);
  const [searchFilesResults, setSearchFilesResults] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);

  const [currentFolder, setCurrentFolder] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  // State variable to hold list of commits
  const [commits, setCommits] = useState(location.state.commits);

  // Get all folders and files from the database for this project
  useEffect(() => {
    // Grab project_id from the header and use it to get all folders and files for this project
    const query = new URLSearchParams(location.search);
    const project_id = query.get('project_id');
    localStorage.setItem('project_id', project_id);
    console.log("ID: " + project_id);
    axios.get(`http://localhost:3001/getFolders?project_id=${project_id}`)
      .then(res => {
        const root_folder_id = (res.data[0]._id != undefined) ? res.data[0]._id : null;
        setProjectName(res.data[0].name);
        setCurrentFolder(res.data[0]);
        res.data[0].name = "root";
        setCurrentPath([...currentPath, res.data[0]]);
        if (root_folder_id != null) {
          axios.get(`http://localhost:3001/getFolders?project_id=${root_folder_id}`)
          .then(async res => {
            setFolders(res.data);
            // Set Loader false after setFolders is done
            await new Promise((resolve) => setTimeout(resolve, 1000));
            props.setLoader(false);
          })
          .catch(err => {
            console.log(err);
          });
        }
        else {
          // Set Loader false after setFolders is done
          props.setLoader(false);
        }
      })
      .catch(err => {
          console.log(err);
      });
  }, []);

  const updateDirContents = async(folder) => {
    // Get the folder_id from the folderName
    // Grab the folders and files within the folder that was clicked and change the states to display them
    const update_folders = await axios.get(`http://localhost:3001/getFolders?project_id=${folder._id}`);
    const files = await axios.get(`http://localhost:3001/getFiles?project_id=${folder._id}`);
    return [update_folders.data, files.data];
  };

  const handleFolderClick = async(folder) => {
    setCurrentFolder(folder);
    const [update_folders, files] = await updateDirContents(folder);
    setFolders(update_folders);
    setFiles(files);
    // Check if we are traversing folder tree or just updating the current folder
    if (currentPath.length > 0 && currentPath[currentPath.length - 1]._id === folder._id) {
      return;
    }
    setCurrentPath([...currentPath, folder]);
  };

  const search = (query) => {
    // Set the searchQuery state variable to the query argument
    setCreateFile(false);
    setCreateFolder(false);
    setSearchQuery(query);
  }

  const handleClear = () => {
    // Clear the searchQuery state variable and the search-input
    setCreateFile(false);
    setCreateFolder(false);
    setSearchQuery('');
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
  }


  useEffect(() => {
    // Filter the folders based on the searchQuery
    const foldersResults = folders.filter(folder => {
      return folder.name.toLowerCase().includes(searchQuery);
    });

    setSearchFoldersResults(foldersResults);

    // Filter the files based on the searchQuery
    const filesResults = files.filter(file => {
      return file.filename.toLowerCase().includes(searchQuery);
    });

    setSearchFilesResults(filesResults);

    // Event listener so the search-input reflects the current searchQuery
    // const searchInput = document.getElementById('search-input');
    // searchInput.value = searchQuery;


  }, [searchQuery]);

  const handleDirPathClick = async(directory, index) => {
    const [update_folders, files] = await updateDirContents(directory);
    setFolders(update_folders);
    setFiles(files);
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const handleDownload = async(file) => {
    const response = await axios.get(`http://localhost:3001/getFile?file_id=${file._id}&file_name=${file.filename}`);
    // Convert the hex string to a buffer
    const buffer = Buffer.from(response.data.fileContents.data, 'hex')
    // Convert the buffer to a Blob object
    const blob = new Blob([buffer], {type: 'application/octet-stream'});
    // Create a link element
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
  }

  const handleFileDelete = async(file) => {
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

  // // Flatten the directory structure into a single array of items
  // const allItems = Object.keys(currentFolder).reduce((acc, key) => acc.concat(currentFolder[key]), []);

  // // Use the filter method to search for items matching the search query
  // const searchResults = allItems.filter(item => item.name && item.name.includes(searchQuery));
  
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
      {
        addFile();
      }
      else
      {
        addFolder();
      }
    }
    else if (event.key === 'Escape') {
      setCreateFile(false);
      setCreateFolder(false);
    }
  }

  const addFolder = async() => {
    // Handle generating unique file object name
    const newFolder = newFolderName;
    // Axios call to create new folder
    await axios.post('http://localhost:3001/createFolder', {
      name: newFolder,
      parent_id: currentFolder._id
    })
    .then(res => {
      // Update the folders state variable
      handleFolderClick(currentFolder);
      setCreateFolder(false);
    });
  } 

  const addFile = async() => {
    // Handle generating unique file object name
    const fileName = newFileName + ':::::' + currentFolder._id;
    console.log(fileName)
    // Create a blank file to upload to gridfs
    const file = new File([""], fileName, {type: "text/plain"});
    // Create a form data object to send to the server
    const formData = new FormData();
    formData.append('files', file);

    // Axios call to upload file to gridfs
    await axios.post('http://localhost:3001/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      // Update the folders state variable
      handleFolderClick(currentFolder);
      setCreateFile(false);
    });
  }

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

  if (props.auth.isLoading) {
    return (
      <LoadingPage />
    )
  } else {
    return (
      <div className="ProjectPageContainer">
          <PhotoCodeHeader setLoader={props.setLoader}/>
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
                        {folder.name}/
                      </h1>
                    </a>
                  </span>
                : <></>))}
              </div>
              <div className="folderDisplay">
                  {Object.entries((searchQuery === '') ? folders : searchFoldersResults).map(([key, folder]) => (
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
                  {Object.entries((searchQuery === '') ? files : searchFilesResults).map(([key, file]) => (
                    <button className='goToFolder'>
                      <div className="line"></div>
                      <div className="folders" key={file._id}  onClick={() => 
                      {
                        navigate('/FileEdit?file_id=' + file._id + '&file_name=' + file.filename)
                        props.setLoader(true);
                      }
                      }>
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
                      autoFocus
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
                      autoFocus
                    />
                  </div>
                </button>}
              </div>
            </div>
            <div className="settings-commits">
              <div className="settingsButton" onClick={() => 
                {
                  navigate('/ProjectSettings');
                  props.setLoader(true);
                }
              }>Project Settings</div>
              <ProjectCommits commits={ location.state.commits }/>
            </div>
          </div>
      </div>
    );
  }
}

export default ProjectPage;