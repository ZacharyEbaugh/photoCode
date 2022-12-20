import './CreateProject.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { PhotoCodeHeader } from './PhotoCodeHeader';
import { TextAreaField } from 'react-simple-widgets';

import deleteFile from './../images/deleteFile.png';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = event => {
    event.preventDefault();

    if (event.target.files.length === 0) {
      return;
    }
    console.log(event.target.files[0]);
    setFiles([...files, event.target.files[0]]);
  };

  const onDrop = (event) => {
    event.preventDefault();
    // Get the files from the event
    console.log(event.dataTransfer.files);
    const droppedItems = event.dataTransfer.files;

    // Loop through the items and add them to the appropriate state
    for (let i = 0; i < droppedItems.length; i += 1) {
      const item = droppedItems[i];
      console.log(item);
      if (item.kind === 'file') {
        // Handle file
        setFiles([...files, item.getAsFile()]);
        // handleFileUpload(item.getAsFile());
      } else if (item.kind === 'folder') {
        // Handle folder
        setFolders([...folders, item.webkitGetAsEntry()]);
        handleFolderUpload(item.webkitGetAsEntry());
      }
    }
  };

  const handleDeleteFile = (index) => {
    // remove the file at the given index from the uploadedFiles array
    const updatedFiles = files.filter((file, i) => i !== index);
    setFiles(updatedFiles);
  };

  const onDragOver = (event) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

//   const handleFileUpload = async (file) => {
//   // Create a new folder
//   const folder = new File([], file.name);

//   // Add the files to the folder
//   files.forEach((f) => folder.append(f.name, f));

//   // Create a new GridFS storage instance
//   const storage = new GridFSStorage({
//     url: 'mongodb://localhost:27017/myapp',
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads',
//           };
//           resolve(fileInfo);
//         });
//       });
//     },
//   });

  // Upload the folder to GridFS
//   const upload = storage.single('folder')({}, folder);
//   await upload;
// };

  // handle create project button
  const handleCreateProject = () => {
    console.log('Create project button clicked');
    // Call /createProject endpoint to create project
    axios.post('http://localhost:3001/createProject', {
      name: projectName,
      description: projectDescription,
      user: localStorage.getItem('id'),
      // files: files,
      // folders: folders,
    })
    .then((response) => {
      const project_id = response.data.project_id;
      console.log(project_id);
      // Create Folder that will act as the root folder for the project
      axios.post('http://localhost:3001/createFolder', {
        name: projectName,
        parent_id: project_id,
      })
      .then((response) => {
        console.log(response.data.folder);
        // Upload files to the root folder
        const folder_id = response.data.folder;
        const formData = new FormData();

        console.log(files[0]);
        formData.append('file', files[0]);
        formData.append('folder_id', folder_id);

        for (const pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        }
        axios.post(`http://localhost:3001/uploadFile`, formData)
        .then((response) => {
          console.log(response);
          // navigate('/Home');
        })
        .catch((error) => {
          console.log(error);
        });
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
              <div
                  className="dropzone"
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onClick={handleClick}
              >
                Drag and drop folders/files or click here to select files.
                <input
                  type="file"
                  ref={fileInput}
                  style={{ display: "none" }}
                  onChange={handleChange}
                /> 
              </div>
              {(files.length > 0 || folders.length > 0) && (
              <div className='listUploadedFiles'>
                {folders.map((folder, i) => (
                  <div className="uploadedFile" key={i}>
                    <h1>
                      {folder.name}
                    </h1>
                    <h1>
                      {folder.type.split('/')[1]}
                    </h1>
                    <button onClick={() => handleDeleteFile(i)}>
                        <img src={deleteFile} alt="delete"/>
                    </button>
                  </div>
                ))}
                {files.map((file, i) => (
                  <div className="uploadedFile" key={i}>
                    <h1>
                      {file.name}
                    </h1>
                    <h1>
                      {file.type.split('/')[1]}
                    </h1>
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
