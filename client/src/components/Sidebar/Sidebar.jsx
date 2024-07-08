import React from 'react';
import Conversations from './Conversations.jsx';
import LogoutButton from './Logout.jsx';
import Profile from './Profile.jsx';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <Profile />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
