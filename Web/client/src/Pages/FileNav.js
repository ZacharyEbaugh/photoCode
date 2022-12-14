import React, { useState } from 'react';

const FileNav = () => {
  const [directory, setDirectory] = useState({
    root: {
      type: 'folder',
      name: 'root',
      contents: {
        folder1: {
          type: 'folder',
          name: 'folder1',
          contents: {
            file1: {
              type: 'file',
              name: 'file1'
            },
            file2: {
              type: 'file',
              name: 'file2'
            }
          }
        },
        folder2: {
          type: 'folder',
          name: 'folder2',
          contents: {
            file3: {
              type: 'file',
              name: 'file3'
            },
            file4: {
              type: 'file',
              name: 'file4'
            }
          }
        }
      }
    }
  });

  const [currentPath, setCurrentPath] = useState(['root']);

  const handleFolderClick = folderName => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleBreadcrumbClick = breadcrumbIndex => {
    setCurrentPath(currentPath.slice(0, breadcrumbIndex + 1));
  };

  const currentFolder = currentPath.reduce(
    (directory, folderName) => directory[folderName].contents,
    directory
  );

  return (
    <div>
      <div>
        {currentPath.map((folderName, index) => (
          <span key={folderName}>
            <a onClick={() => handleBreadcrumbClick(index)}>{folderName}</a>
            {index < currentPath.length - 1 ? ' / ' : ''}
          </span>
        ))}
      </div>
      <div>
        {Object.entries(currentFolder).map(([key, value]) =>
          value.type === 'folder' ? (
            <div key={key}>
              <a onClick={() => handleFolderClick(key)}>{value.name}</a>
            </div>
          ) : (
            <div key={key}>{value.name}</div>
          )
        )}
      </div>
    </div>
  );
};

export default FileNav;
