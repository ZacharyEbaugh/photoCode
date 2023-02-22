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
import PathLoader from "./PathLoader";

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

  // Loader for path traversal 
  const [pathLoader, setPathLoader] = useState(false);

  // Get all folders and files from the database for this project
  useEffect(() => {

    // Grab project_id from the header and use it to get all folders and files for this project
    const query = new URLSearchParams(location.search);
    const project_id = query.get('project_id');
    localStorage.setItem('project_id', project_id);
    console.log("ID: " + project_id);
    axios.get(`http://localhost:3001/getFolders?project_id=${project_id}`)
      .then(async(res) => {
        const root_folder_id = (res.data[0]._id != undefined) ? res.data[0]._id : null;
        setProjectName(res.data[0].name);
        setCurrentFolder(res.data[0]);
        res.data[0].name = "root";
        const setRootPath = setCurrentPath(...currentPath, [res.data[0]]);
        
        // If the root folder exists, get all folders and files for this project
        if (root_folder_id != null) {
          const folder = {};
          folder._id = root_folder_id;
          const updateFolders = await handleFolderClick(folder);
          Promise.resolve(updateFolders).then(() => {
            props.setLoader(false);
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

    // Handle loading and do not allow creating file/folder cross directories
    setPathLoader(true);
    setCreateFile(false);
    
    // Clear any names input for these new files/folders
    setNewFileName('');
    setNewFolderName('');

    setCreateFolder(false);

    setCurrentFolder(folder);
    const [update_folders, files] = await updateDirContents(folder);
    setFolders(update_folders);
    setFiles(files);
    // Check if we are traversing folder tree or just updating the current folder
    // if (currentPath.length > 0 && currentPath[currentPath.length - 1]._id === folder._id) {
    //   return;
    // }
    setCurrentPath([...currentPath, folder]);
    setPathLoader(false);
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
    
    // Handle loading and do not allow creating file/folder cross directories
    setPathLoader(true);
    setCreateFile(false);

    // Clear any names input for these new files/folders
    setNewFileName('');
    setNewFolderName('');

    setCreateFolder(false);

    const [update_folders, files] = await updateDirContents(directory);
    setFolders(update_folders);
    setFiles(files);
    setCurrentPath(currentPath.slice(0, index + 1));
    setPathLoader(false);
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

  const addNewFolder = () => {
    setCreateFile(false);
    setNewFileName('');
    setCreateFolder(true);
  }

  const addNewFile = () => {
    setCreateFolder(false);
    setNewFolderName('');
    setCreateFile(true);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newFolderName == '' && newFileName == '')
      {
        console.log("ERROR: Invalid new file/folder name");
        return;
      }
      else if (newFolderName != '' && newFolderName.length > 1)
      {
          addFolder();
      }
      else if (newFileName != '' && newFileName.length > 1)
      {
        addFile();
      }
    }
    else if (event.key === 'Escape') {

      // Close the create file/folder entry
      setCreateFile(false);
      setCreateFolder(false);

      // Clear the new file/folder name
      setNewFileName('');
      setNewFolderName('');
    }
  }

  const addFolder = async() => {
    // Handle generating unique folder object
    const newFolder = newFolderName;
    const parent_folder_id = currentPath[currentPath.length - 1]._id;
    const project_id = localStorage.getItem('project_id');

    // Axios call to create new folder
    try {
      await axios.post('http://localhost:3001/createFolder', {
        name: newFolder,
        parent_id: parent_folder_id,
        project_id: project_id
      })
      .then(async res => {
        // Set up folder object to update directory
        const folder = {
          _id: parent_folder_id,
        }
        // Update the folder and file directory
        const [update_folders, files] = await updateDirContents(folder);
        setFolders(update_folders);
        setFiles(files);
        // Update folder state variable
        setCreateFolder(false);
      });
    } catch (err) {
      console.log("Failed to Create Folder");
      console.log(err);
    }
  } 

  const addFile = async() => {
    // Handle generating unique file object
    const parent_folder_id = currentPath[currentPath.length - 1]._id;
    const project_id = localStorage.getItem('project_id');
    const fileName = newFileName + ':::::' + parent_folder_id + ':::::' + project_id;
    
    /* For debugging */
    // console.log(fileName)

    // Create a blank file to upload to gridfs
    const file = new File([""], fileName, {type: "text/plain"});

    // Create a form data object to send to the server
    const formData = new FormData();
    formData.append('files', file);

    try {
      // Axios call to upload file to gridfs
      await axios.post('http://localhost:3001/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(async res => {
        // Set up folder object to update directory
        const folder = {
          _id: parent_folder_id,
        }
        // Update folders and files
        const [update_folders, files] = await updateDirContents(folder);
        setFolders(update_folders);
        setFiles(files);
        // Update file state variable
        setCreateFile(false);
        console.log("Created file: " + newFileName)
      });
    } catch (err) {
      console.log("Failed to make file: " + newFileName);
      console.log(err)
    }
  }


  if (props.auth.isLoading) {
    return (
      <LoadingPage />
    )
  } else {
    return (
      <div className="gradientContainer">
      <div className="ProjectPageContainer">
          <PhotoCodeHeader setLoader={props.setLoader}/>
          <div className="directory-commits">
            <div className="directory">
              <div className="dirBlock">
                <h1 className="projectPageTitle">{projectName}</h1>
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
                  <div className="dirPathView">
                    {(currentPath.length > 0) ? 
                      currentPath.map((folder, index) => {
                        return (
                          <span className="dirPathButton" key={folder}>
                            <a onClick={() => handleDirPathClick(folder, index)}>
                              <h1>
                                {folder.name}/
                              </h1>
                            </a>
                          </span>
                        )
                      })
                      : <></>
                    }
                  </div>
                </div>

                {(pathLoader === true) ? <PathLoader /> :
                  <div className="folderDisplay">
                      {Object.entries((searchQuery === '') ? folders : searchFoldersResults).map(([key, folder]) => (
                        <button className={(key == folders.length - 1 && files.length == 0) ? 'goToFolderLast' : 'goToFolder'}>
                          <div className="line"></div>
                          <div className="folders" key={key}  onClick={() => handleFolderClick(folder)}>
                            <img src={blueFolder} alt="blue folder" className="folderIcon"/>
                            <h1>
                              {folder.name}
                            </h1>
                          </div>
                          {/* <HiOutlineDownload
                            className="downloadButton"
                            // onClick={() => handleDownload(folder)}
                          /> */}
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
                </div>}
              </div>
            </div>
            <div className="settings-commits">
              <div className="commitContent">
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
      </div>
      </div>
    );
  }
}

export default ProjectPage;