import './CreateProject.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PhotoCodeHeader } from './PhotoCodeHeader';
import '@github/file-attachment-element'

import deleteFile from './../images/deleteFile.png';
import { useNavigate } from 'react-router-dom';
import { setNestedObjectValues } from "formik";

const CreateProject = () => {
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
  const handleCreateProject = async() => {
    console.log('Create project button clicked');
    // Call /createProject endpoint to create project in the database and get the project id
    axios.post('http://localhost:3001/createProject', {
      name: projectName,
      description: projectDescription,
      user: localStorage.getItem('id'),
    })
    .then((response) => {
      const project_id = response.data.project_id;
      // Create Folder that will act as the root folder for the project with a parent id of the project id
      axios.post('http://localhost:3001/createFolder', {
        name: projectName,
        parent_id: project_id,
      })
      .then((response) => {
        // Upload files to the root folder
        const folder_id = response.data.folder.lastErrorObject.upserted;
      
        // Create form data object to send files and metadata to the server
        const formData = new FormData();

        // Append the parent folder id to the form data
        formData.append('folder_id', folder_id);

        // Append the files to the form data and handle subFolder creation
        files.forEach(async (file) => {
          formData.append('files', file.file);
          // If the file is in a subdirectory, create a folder with the name of the directory and the parent id of the parent folder
          // Traverse down the directory tree and create folders for each subdirectory
          // Append adjusted parent_id to each file in the form data
          if (file.directory != undefined && file.fullPath != undefined) {
            // Create an array of the subdirectories, excluding the root directory and the file name
            // For each entry in the array, every entry before it is the parent folder
            const folderPath = file.fullPath.split('/').slice(1, -1);
            // Initial parent_id should be the root folder id
            // const parent_id = folder_id;
            // setParent_id(folder_id);
            localStorage.setItem('parent_id', folder_id);

            for (let i = 0; i < folderPath.length; i++) {
              console.log(i + "\t" + localStorage.getItem('parent_id'));
              // Check if the folder already exists in the database and if not
              // create it with the parent id of the previous folder 
              // and append the folder id to the form data
              // axios.post('http://localhost:3001/createFolder', {
              //   name: folderPath[i],
              //   parent_id: localStorage.getItem('parent_id'),
              // })
              // .then((response) => {
              //   if (response.data.folder.value === null) {
              //     localStorage.setItem('parent_id', response.data.folder.lastErrorObject.upserted);
              //     if (folderPath.length > 1) {
              //       console.log("Should be parent_id for next loop:\t\t" + localStorage.getItem('parent_id'));
              //     }
              //   }
              //   else {
              //     localStorage.setItem('parent_id', response.data.folder.value._id);
              //     if (folderPath.length > 1) {
              //       console.log("Should be parent_id for next loop:\t\t" + localStorage.getItem('parent_id'));
              //     }
              //   }

              const response = await axios.post('http://localhost:3001/createFolder', {
                name: folderPath[i],
                parent_id: localStorage.getItem('parent_id'),
              });
              if (response.data.folder.value === null) {
                localStorage.setItem('parent_id', response.data.folder.lastErrorObject.upserted);
                if (folderPath.length > 1) {
                  console.log("Should be parent_id for next loop:\t\t" + localStorage.getItem('parent_id'));
                }
              }
              else {
                localStorage.setItem('parent_id', response.data.folder.value._id);
                if (folderPath.length > 1) {
                  console.log("Should be parent_id for next loop:\t\t" + localStorage.getItem('parent_id'));
                }
              }
                
                // formData.append('folder_id', folder_id);
       

            }
          }
        });

        // // Upload the files to the server using the /uploadFile endpoint with the folder id as the parent folder id 
        // axios.post('http://localhost:3001/uploadFile', formData)
        // .then((response) => {
        //   console.log(response);
        //   // navigate('/Home');
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
      })
      .catch((error) => {
        console.log(error);
      });
      // navigate('/Home');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className='CreateProjectContainer'>
        <PhotoCodeHeader/>
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
};

export default CreateProject;
