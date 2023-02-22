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
    axios.post('http://localhost:3001/createProject', {
      name: projectName,
      description: projectDescription,
      user: localStorage.getItem('user_id'),
      picture: localStorage.getItem('picture'),
    })
    .then(async(response) => {
      const project_id = response.data.project_id;
      // Create Folder that will act as the root folder for the project with a parent id of the project id
      axios.post('http://localhost:3001/createFolder', {
        name: projectName,
        parent_id: project_id,
      })
      // I want to test separating the creation of folders and uploading files, this will create folders and as they are created map the parent id to the folder name in a dictionary
      // This might need some weird workarounds as the problem is mongoDB being fast enough to recognize that the object is created
      // Once this foldername -> folder_id mapping is created we can create the filenames to upload the list of files pulling the id from the map
      .then(async (response) => {
        // Loop over files and isolate the structure of the folders, this can be a map of 
        // folder_name -> {_id, children: [child_folder1_name, child_folder2_name]}
        // child_folder1_name -> {_id, children: []}
        // child_folder2_name -> {_id, children: []}
        const folder_struct = {};
        const filesLoop = files.map(async (file) => {

          // If the directory is null, then this is a root file, there is no need to create a folder, continue
          if (file.directory === undefined) {
            return;
          }

          // Breakdown the directory string into a list of folders
          const folderPath = file.directory.split('/').slice(1);

          // Check if the root of the path is already in the folder structure
          if (folder_struct[folderPath[0]] === undefined) {
            // If not, create the root folder and add it to the folder structure
            folder_struct[folderPath[0]] = {_id: '', children: {}, parent_id: response.data.folder.lastErrorObject.upserted};
          }

          // Check if there are any subfolders
          if (folderPath.length === 1) {
            // If not, continue
            return;
          }
          
          // If there are subfolders
          // Traverse down the directory tree and create folders for each subdirectory and append each child to the folder before it
          for (let i = 1; i < folderPath.length; i++) {

            // Check if the folder already exists in the database and if not
            // Check if the folder already exists in children of the parent folder
            if (folder_struct[folderPath[i]] === undefined) {

              // If not, create the folder and add it to the folder structure
              folder_struct[folderPath[i]] = {_id: '', children: {}, parent_id: undefined};

              // Check if the folder already exists in the children of the parent folder
              if (folder_struct[folderPath[i-1]].children[folderPath[i]] === undefined) {

                // If not, create the folder and add it to the folder structure
                folder_struct[folderPath[i-1]].children[folderPath[i]] = {};
              }
            }
          }
          
       
        });

        // Now that the folder structure is established in a local variable, we can loop over these folders and create them in the database, setting the parent_id to the parent folder id
        // Create a queue of folders to create, start with folders that have a parent_id 
        const folderQueue = [];
        for (const folderName in folder_struct) {
          if (folder_struct[folderName].parent_id !== undefined) {
            folderQueue.push(folderName);
          }
        }

        // For the folders that have a parent_id, create the folder and set the _id to the folder id, then set all it's children's parent_id to the folder id
        while (folderQueue.length > 0) {
          const folderName = folderQueue.shift();
          if (folder_struct[folderName].parent_id !== undefined) {

            // Create the folder
            const folder = await axios.post('http://localhost:3001/createFolder', {
              name: folderName,
              parent_id: folder_struct[folderName].parent_id,
            })
            .then(async (response) => {

              // Set the folder id to the folder structure
              folder_struct[folderName]._id = response.data.folder.lastErrorObject.upserted;

              // Set the parent_id of all the children to the folder id
              for (const childFolderName in folder_struct[folderName].children) {
                folder_struct[childFolderName].parent_id = folder_struct[folderName]._id;
                folderQueue.push(childFolderName);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          }
        }

        // Once this structure is created we can loop over the folder structure as follows, create the folder on the top level, identify all children, after top level folder created, loop over children and use the parent_id of the top level folder to create the child folders
        const formData = new FormData();
        // Loop over all files and create a promise for each file
        const filePromises = files.map(async (file) => {
          // For each file, identify the immediate parent folder of the file and append the folder_id to the form data
          if (file.directory != undefined && file.fullPath != undefined) {

            // Isolate the parent folder name
            const path = file.directory.split('/').slice(1);
            const parentFolderName = path[path.length - 1];

            // Append the parent id to the file which will be appended to the form data
            file.file.parent_id = folder_struct[parentFolderName]._id;
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
          const response = await axios.post('http://localhost:3001/uploadFile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.log(error);
        }
      });
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
      <div className="CreateProjectMain">
        <PhotoCodeHeader setLoader={props.setLoader}/>
        {/* <h2>Create a new project</h2> */}
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
    </div>
  );
  }
};

export default CreateProject;
