import React from 'react';
import Conversations from './Conversations.jsx';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <Conversations />
    </div>
  );
};

export default Sidebar;
