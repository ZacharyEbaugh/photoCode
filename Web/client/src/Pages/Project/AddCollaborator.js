import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make a request to the MongoDB server to search for users
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/searchUsers', {
          params: {
            username: searchQuery
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
