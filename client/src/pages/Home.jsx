import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = Cookies.get('jwt');
        const res = await axios.get('https://s51-john-discuter.onrender.com/users/getusers', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        console.log(res.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    
    fetchUsers();
  }, []);

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
};

export default Home;
