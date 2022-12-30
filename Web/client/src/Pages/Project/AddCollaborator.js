import './AddCollaborator.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(searchQuery);
    // Make a request to the MongoDB server to search for users
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/searchUsers', {
          params: {
            username: searchQuery
          }
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [searchQuery]);

  return (
    <div className='AddCollaboratorBox'>
        <h1>Add Collaborators</h1>
      <input
        type="text"
        value={searchQuery}
        placeholder="Search for a user"
        onChange={event => setSearchQuery(event.target.value)}
      />
        {users.map(user => (
            <div className='userFound'>
                <div className='userInfo'>
                    <h1>
                        {user.username}
                    </h1>
                    <h2>{user.email}</h2>
                    <h2>{user.connection}</h2>
                </div>
                <button className='addCollaboratorButton' onClick={() => handleAddCollaborator(user._id)}>Add</button>


            </div>
        ))}
    </div>
  );
}

export default UserList;
