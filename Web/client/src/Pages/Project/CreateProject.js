import './CreateProject.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PhotoCodeHeader } from '.././PhotoCodeHeader';
import LoadingPage from '../LoadingPage';
import '@github/file-attachment-element'

import deleteFile from '../.././images/deleteFile.png';
import { useNavigate } from 'react-router-dom';
import { setNestedObjectValues } from "formik";

const CreateProject = (props) => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const [parent_id, setParent_id] = useState('');

  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = event => {
    console.log(...event.target.files);
    event.preventDefault();

    const addFiles = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const Attachment = {
        file: event.target.files[i],
      }
      addFiles.push(Attachment);
    }

    if (event.target.files.length === 0) {
      return;
    }
    console.log(addFiles);
    setFiles([...files, ...addFiles]);
  };

  useEffect(() => {
    window.addEventListener('file-attachment-accepted', function(event) {
      event.preventDefault();
      const uploadFiles = event.detail.attachments;
      setFiles([...files, ...uploadFiles]);
    });
  });

  const handleDeleteFile = (index) => {
    // remove the file at the given index from the uploadedFiles array
    const updatedFiles = files.filter((file, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  // handle create project button
  const handleCreateProject = () => {
    props.setLoader(true);
    // Call /createProject endpoint to create project in the database and get the project id
    axios.post('https://photocode.app:8443/createProject', {
      name: projectName,
      description: projectDescription,
      user: localStorage.getItem('user_id'),
      picture: localStorage.getItem('picture'),
    })
    .then(async(response) => {
      const project_id = response.data.project_id;
      // Create Folder that will act as the root folder for the project with a parent id of the project id
      axios.post('https://photocode.app:8443/createFolder', {
        name: projectName,
        parent_id: project_id,
      })
      .then(async (response) => {
        // Upload files to the root folder
        const folder_id = response.data.folder.lastErrorObject.upserted;
        console.log(folder_id);
        // Create form data object to send files and metadata to the server
        const formData = new FormData();
        // Loop over all files and create a promise for each file
        const filePromises = files.map(async (file) => {
          // If the file is in a subdirectory, create a folder with the name of the directory and the parent id of the parent folder
          // Traverse down the directory tree and create folders for each subdirectory
          // Append adjusted parent_id to each file in the form data
          if (file.directory != undefined && file.fullPath != undefined) {
            // Create an array of the subdirectories, excluding the root directory and the file name
            // For each entry in the array, every entry before it is the parent folder
            const folderPath = file.fullPath.split('/').slice(1, -1);
            // Initial parent_id should be the root folder id
            localStorage.setItem('parent_id', folder_id);
            for (let i = 0; i < folderPath.length; i++) {
              // Check if the folder already exists in the database and if not
              // create it with the parent id of the previous folder within this loop
              const response = await axios.post('https://photocode.app:8443/createFolder', {
                name: folderPath[i],
                parent_id: localStorage.getItem('parent_id'),
              })
              .then((response) => {
                if (response.data.folder.value === null) {
                  // localStorage.setItem('parent_id', response.data.folder.lastErrorObject.upserted);
                  localStorage.setItem('parent_id', response.data.folder.lastErrorObject.upserted);
                }
                else {
                  // localStorage.setItem('parent_id', response.data.folder.value._id);
                  localStorage.setItem('parent_id', response.data.folder.value._id);
                }
              });
            }
            // Append the parent id to the file which will be appended to the form data
            file.file.parent_id = localStorage.getItem('parent_id');
          }
          return file.file;
        });
        // Resolve all promises and append the files to the form data
        const resolvedFiles = await Promise.all(filePromises);
        resolvedFiles.forEach((file) => {
          formData.append('files', file, file.name + ":::::" + file.parent_id);
          console.log(file);
        });
        try {
          // Upload the files to the server using the /uploadFile endpoint with the folder id as the parent folder id 
          const response = await axios.post('https://photocode.app:8443/uploadFile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      // Wait for the project to be created and the files to be uploaded before navigating to the home page
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/Home');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  if (props.auth.isLoading) {
    return (
      <LoadingPage />
    )
  } else {
  return (
    <div className='CreateProjectContainer'>
        <PhotoCodeHeader setLoader={props.setLoader}/>
        <h2>Create a new project</h2>
        <div className='CreateProject'>
            <div className='CreateProjectForm'>
                <input
                    type="text"
                    className="inputField"
                    placeholder='Name of project'
                    value={projectName}
                    onChange={handleProjectNameChange}
                />
                 <textarea
                    className="inputFieldDescription"
                    placeholder='Description of project'
                    onChange={handleProjectDescriptionChange}
                    rows={4}
                    cols={50}
                />
                <button type="button" onClick={() => handleCreateProject()} className="CreateProjectButton">
                    Create Project
                </button>
            </div>
            <div className='CreateProjectFileUploader'>
            <file-attachment
              className="GitHubFileAttach"
              input="file"
              directory>
              <div className="file-attachment-text">Drag and drop folders/files or click here to select files.</div>
              <input 
                className="inputUploadFiles"
                type="file"
                onChange={handleChange}
                multiple />
            </file-attachment>
            {(files.length > 0 || folders.length > 0) && (
              <div className='listUploadedFiles'>
                {files.map((file, i) => (
                  <div className="uploadedFile" key={i}>
                    <h1>
                      {(file.fullPath != undefined) ? file.fullPath : file.file.name}
                    </h1>
                    {/* <h1>
                      {file.file.type.split('/')[1]}
                    </h1> */}
                    <button onClick={() => handleDeleteFile(i)}>
                        <img src={deleteFile} alt="delete"/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
  }
};

export default CreateProject;
