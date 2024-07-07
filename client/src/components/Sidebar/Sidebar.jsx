import React from 'react';
import Conversations from './Conversations.jsx';
import LogoutButton from './Logout.jsx';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
