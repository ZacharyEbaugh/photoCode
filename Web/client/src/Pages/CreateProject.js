import './CreateProject.css';
import React, { useState } from 'react';
import { PhotoCodeHeader } from './PhotoCodeHeader';
import { TextAreaField } from 'react-simple-widgets';

import deleteFile from './../images/deleteFile.png';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const onDrop = (event) => {
    event.preventDefault();
    // Get the files from the event
    const droppedItems = event.dataTransfer.items;

    // Loop through the items and add them to the appropriate state
    for (let i = 0; i < droppedItems.length; i += 1) {
      const item = droppedItems[i];

      if (item.kind === 'file') {
        // Handle file
        setFiles([...files, item.getAsFile()]);
        handleFileUpload(item.getAsFile());
      } else if (item.kind === 'folder') {
        // Handle folder
        setFolders([...folders, item.webkitGetAsEntry()]);
        handleFolderUpload(item.webkitGetAsEntry());
      }
    }
  };

const handleFileDrop = (event) => {
    event.preventDefault();

    // get the files that were dropped
    const files = event.dataTransfer.files;

    // upload the files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // do something with the file here, like upload it to a server
      // for the sake of this example, we'll just add it to the uploadedFiles array

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


  return (
    <div className='CreateProjectContainer'>
        <PhotoCodeHeader/>
        <h1>New Project</h1>
        <div className='CreateProject'>
            <div className='CreateProjectForm'>
                <input
                    type="text"
                    className="inputField"
                    placeholder='Name of project'
                    value={projectName}
                    onChange={handleProjectNameChange}
                />
                {/* <input
                    type="text"
                    className="inputField"
                    placeholder='Description of project'
                    multi
                    value={projectDescription}
                    onChange={handleProjectDescriptionChange}
                /> */}
                 <textarea
                    className="inputFieldDescription"
                    // style={{
                    //     resize: 'none',
                    // }}
                    placeholder='Description of project'
                    rows={4}
                    cols={50}
                />
                <button type="button" className="CreateProjectButton">
                    Create Project
                </button>
            </div>
            <div className='CreateProjectFileUploader'>
                <div
                    className="dropzone"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    Drag and drop files here
                </div>
                {/* <ul>
                    {files.map((file) => (
                    <li key={file.name}>
                        {file.name} ({file.type})
                        <progress value={0} max={1} />
                        <button type="button">
                        Upload
                        </button>
                    </li>
                    ))}
                </ul> */}
                {files.length > 0 && (
                <div className='listUploadedFiles'>
                {files.map((file, i) => (
                    <div className="uploadedFile" key={i}>
                        <h1>
                            {file.name}     {file.type}
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
