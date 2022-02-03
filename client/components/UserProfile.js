import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { username, id, email } = useSelector((state) => {
    return state.auth;
  });

  console.log('user', username);
  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome {username}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserProfile;
