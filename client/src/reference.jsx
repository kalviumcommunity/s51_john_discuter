import { useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

function Reference() {
  const [res, setRes] = useState('');
  const [sent, setSent] = useState(null);

  useEffect(() => {
    result(); // Initial login request on component mount
  }, []);

  const result = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username: 'cornellewsjohn',
        password: 'cornellews'
      });
      setRes(res.data);
      console.log(res.data);
      Cookies.set('jwt', res.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sub = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const res = await axios.post(
        `http://localhost:3000/message/send/667573117b30b114c7eca3ba`,
        {
          message: 'nothing 2'
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log(res.data);
      setRes(res.data);
      setSent(res.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const del = async () => {
    try {
      const jwt = Cookies.get('jwt');
      console.log(jwt);
      const res = await axios.delete(
        `http://localhost:3000/message/deletemsg/${sent}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const jwt = Cookies.get('jwt');
      const res = await axios.get(`http://localhost:3000/users/getusers`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>
      <h1>{JSON.stringify(res).slice(0, 10)}</h1>
      </div>
      <div>
      <button onClick={sub}>send</button>
      <button onClick={del}>delete</button>
      <button onClick={getUsers}>getusers</button>
      </div>
    </>
  );
}

export default Reference;
