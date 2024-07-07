import React, { useEffect, useState } from 'react';
import { useStore } from "../app/store.js";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import MessageContainer from '../components/messages/MessageContainer.jsx';
import Cookies from "js-cookie";
import axios from "axios";
import ChatSkeleton from '../skeletons/ChatSkeleton.jsx'
import io from "socket.io-client";
import { useListenMessage } from '../hooks/useListenMessage.js';

const Home = () => {
  const {
    selectedConversation,
    setUsers,
    setFilteredUsers,
    authUser,
    setLatestMessage,
    setSocket,
    setOnlineUsers,
    messages,
    socket
  } = useStore();
  const [loading, setLoading] = useState(true);

  const jwt = Cookies.get('jwt');

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

  const fetchlatestMessages = async () => {
    try {
      console.log(jwt);
      const res = await axios.get(`http://localhost:3000/message/getlatestmsg/${authUser._id}`, {
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchlatestMessages();
      await getUsers();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(messages)
  }, [messages])
  useEffect(() => {
    const socketConnection = () => {
      if (authUser) {
        const newSocket = io.connect("http://localhost:3000", {
          query: {
            userID: authUser._id
          }
        });
        setSocket(newSocket);
        newSocket.on("onlineUsers", (users) => {
          setOnlineUsers(users);
        });

        return () => {
          newSocket.close();
        };
      }
    };

    return () => socketConnection();
  }, [authUser]);

    useListenMessage()

  return (
    <div className='flex font-mono'>
      {loading ? (
        <div className='flex flex-col'>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </div>
      ) : (
        <>
          <Sidebar />
          {JSON.stringify(selectedConversation) !== "{}" ? (
            <MessageContainer />
          ) : (
            <h1 className="text-red-600">Select a convo</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
