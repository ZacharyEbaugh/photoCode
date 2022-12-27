import React,{ useState, useRef, useEffect } from 'react'
import "./FileEdit.css";

import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { langs, loadLanguage } from '@uiw/codemirror-extensions-langs';

import { Buffer } from 'buffer';

import {
  FaFileCode,
  FaRegFolderOpen
} from "react-icons/fa";
import { PhotoCodeHeader } from './PhotoCodeHeader';

function File_Edit() {

  // State variable to holder file information
  const [fileName, setFileName] = useState('');
  const [fileId, setFileId] = useState('');

 
  // Axios call to get file information
  useEffect(() => {

    async function getFileInfo() {

      console.log(fileId);

      // Set queiries for setting file
      const urlParams = new URLSearchParams(window.location.search);
      const idPromise = setFileId(urlParams.get('file_id'));
      const namePromise = setFileName(urlParams.get('file_name'));

      await Promise.resolve(idPromise, namePromise).then(async() => {
        const response = await axios.get(`http://localhost:3001/getFile?file_id=${urlParams.get('file_id')}`);
        const buffer = Buffer.from(response.data.fileContents.data, 'hex')
        setCode(buffer.toString());
      });

    }
    getFileInfo();

  }, [fileId])
 
    const [code, setCode] = useState('Hello World!');
 
    const langLoad = loadLanguage('java');

  return (
    <div className="containerFileEdit">
      <PhotoCodeHeader/>
      <div className="Edit_Commit">
        <div className='File'>
          <div className="editor">
            <h1 className="fileTitle">
              Editing {fileName}
            </h1>
            <CodeMirror 
              className='CodeMirror'
              value={code}
              maxHeight={'60vh'}
              theme='light'
              mode={'javascript'}
              onChange={(editor, change) => {
                setCode(editor.valueOf());
                console.log(code);
              }
            }/>
          </div>
      
          </div>
          <div className="commit_information">
              <input
              type="text"
              className="titleName"
              placeholder={"Update " + fileName}
              />
              <textarea 
                className="description"
                placeholder="Changes made..."  
              />
              <button className="updateFile">            
                  Update File
              </button>
          </div>
      </div>
    </div>
  )
}

export default File_Edit;