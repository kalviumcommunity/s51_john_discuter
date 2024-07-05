import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useStore } from '../../app/store.js';
import axios from "axios"
import Conversations from './Conversations.jsx';

const Sidebar = () => {
  const jwt = Cookies.get('jwt');
  const { authUser, setLatestMessage, setUsers, setFilteredUsers } = useStore();

  const fetchlatestMessages = async () => {
    try {
      console.log(jwt);
      const res = await axios.get(`https://s51-john-discuter.onrender.com/message/getlatestmsg/${authUser._id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(res.data);
      res.data.forEach((message) => {
        const id = message.senderId !== authUser._id ? message.senderId : message.receiverId;
        setLatestMessage(message.message, id);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get('https://s51-john-discuter.onrender.com/users/getusers', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(res.data);
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchlatestMessages();
    getUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Conversations />
    </div>
  );
};

export default Sidebar;
