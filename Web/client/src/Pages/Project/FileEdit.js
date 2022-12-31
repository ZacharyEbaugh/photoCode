import React,{ useState, useRef, useEffect } from 'react'
import "./FileEdit.css";
import LoadingPage from '../LoadingPage';

import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { langs, loadLanguage } from '@uiw/codemirror-extensions-langs';

import {tags} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/language"
import {syntaxHighlighting} from "@codemirror/language"


import { Buffer } from 'buffer';

import {
  FaFileCode,
  FaRegFolderOpen
} from "react-icons/fa";
import { PhotoCodeHeader } from '.././PhotoCodeHeader';
import { useNavigate } from 'react-router-dom';

function File_Edit(props) {
  const navigate = useNavigate();
  // State variable to holder file information
  const [fileName, setFileName] = useState('');
  const [fileId, setFileId] = useState('');
  const [code, setCode] = useState('Hello World!');
  const langLoad = loadLanguage('java');


 
  // Axios call to get file information
  useEffect(() => {
    async function getFileInfo() {
      // Set queiries for setting file
      const urlParams = new URLSearchParams(window.location.search);
      const idPromise = setFileId(urlParams.get('file_id'));
      const namePromise = setFileName(urlParams.get('file_name'));

      await Promise.resolve(idPromise, namePromise).then(async() => {
        const response = await axios.get(`http://localhost:3001/getFile?file_id=${urlParams.get('file_id')}`);
        const buffer = Buffer.from(response.data.fileContents.data, 'hex')
        await setCode(buffer.toString());
      });
    }
    getFileInfo().then(() => {
      props.setLoader(false);
    });
  }, [fileId])

  // API call to update file information
  const updateFile = async () => {
    props.setLoader(true);
    const response = await axios.post(`http://localhost:3001/updateFile`, {
      file_id: fileId,
      file_contents: code
    });
    if (response.status === 200) {
      console.log('File updated');
      navigate(-1);
    }
    else {
      console.log('File not updated');
    }
  } 

  const myHighlightStyle = HighlightStyle.define([
    {tag: tags.keyword, color: "#fc6"},
    {tag: tags.comment, color: "#f5d", fontStyle: "italic"}
  ])

  if (props.auth.isLoading) {
    return (
      <LoadingPage />
    )
  } else {
    return (
      <div className="containerFileEdit">
        <PhotoCodeHeader setLoader={props.setLoader}/>
        <div className="Edit_Commit">
          <div className='File'>
            <div className="editor">
              <button className="backButton" onClick={() => 
                {
                  props.setLoader(true);
                  navigate(-1)
                }
              }>
                {"<- Back to " + fileName.split('.')[0] + ""}
              </button>
              <h1 className="fileTitle">
                Editing {fileName}
              </h1>
              <CodeMirror 
                className='CodeMirror'
                value={code}
                minHeight={'20vh'}
                maxHeight={'60vh'}
                theme='light'
                extensions={[syntaxHighlighting(myHighlightStyle)]}
                mode={'javascript'}
                onChange={(editor, change) => {
                  setCode(editor.valueOf());
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
                <div className='buttons'>
                  <button className="cancelButton" onClick={() => 
                    {
                      props.setLoader(true);
                      navigate(-1)
                    }
                  }>
                      Cancel
                  </button>
                  <button className="updateFile" onClick={() => updateFile()}>            
                      Update File
                  </button>
                </div>
          
            </div>
        </div>
      </div>
    )
  }
}

export default File_Edit;