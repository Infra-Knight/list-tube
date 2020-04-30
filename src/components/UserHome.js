import React from 'react';

const UserHome = ({ userData }) => (
  <div>
    Welcome
    {' '}
    {userData.name}
    {' '}
    {userData.uuid}
  </div>
);

export default UserHome;
