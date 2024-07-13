import React, { useState } from 'react';
import axios from "axios";
import { useStore } from '../../app/store.js';
import { useEffect } from 'react';
import Cookies from "js-cookie";
import { FaEdit, FaStar } from "react-icons/fa";
import LogoutButton from './Logout';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from '../../firebase.js';

const Profile = () => {
  const { authUser, messages, setAuthUser } = useStore();
  const [loading, setLoading] = useState({ star: false, update: false });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState();
  const jwt = Cookies.get("jwt");

  const fetchStarredMessages = async () => {
    try {
      setLoading(prev => ({ ...prev, star: true }));
      const res = await axios.get(`https://s51-john-discuter.onrender.com/message/starred/${authUser._id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log(res.data);
      setData(res.data.starredMessages);
    } catch (error) {
      console.log(error.message);
      setData(null);
    } finally {
      setLoading(prev => ({ ...prev, star: false }));
    }
  };

  useEffect(() => {
    fetchStarredMessages();
  }, [messages]);

  const updateUser = async (data) => {
    try {
      setLoading(prev => ({ ...prev, update: true }));
      let profilePicUrl = authUser.profilePic;

        if (data.profilePic && data.profilePic.length > 0) {
          const file = data.profilePic[0];
          const storageRef = ref(storage, `profilePics/${authUser._id}/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          profilePicUrl = await getDownloadURL(snapshot.ref);
        }
      
      const updatedUserData = {
        fullName: data.fullName,
        profilePic: profilePicUrl,
      };
      console.log(updatedUserData)
      const res = await axios.put("https://s51-john-discuter.onrender.com/users/updateuser", {data: updatedUserData}, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log(res.data, "updated profile");
      document.getElementById('updateuserModal').close();
      localStorage.setItem("authUser", res.data)
      setAuthUser(res.data)
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  };

  return (
    <div>
      <dialog id="updateuserModal" className="modal">
        <form onSubmit={handleSubmit(updateUser)} className="modal-box">
          <h2 className='p-3 text-red-500'>change fullName </h2>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" defaultValue={authUser.fullName} className="grow" placeholder="Full Name" {...register("fullName")} />
          </label>
          <h2 className='p-3 text-red-500'>choose new Profile Pic</h2>
            <input type="file" id="imageupload" {...register("profilePic")} />
          <div className="modal-action">
            {
               loading.update
               ? <span className='loading loading-spinner loading-md'></span>
               : <button type="submit" className="btn">Update</button>
            }
            <button type="button" onClick={() => document.getElementById('updateuserModal').close()} className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <div className='flex items-center'>
      <img 
        onClick={() => document.getElementById('profileModal').showModal()}
        className='w-[75px] h-[75px] rounded-full' 
        src={authUser.profilePic} 
        alt="Profile"
      />
      <h2 className='p-4'>{authUser.fullName}</h2>
      </div>
      <dialog id="profileModal" className="modal">
        <div className="modal-box">
        
            <div className="flex flex-col items-center justify-center">
              <img className='rounded-full h-[300px] w-[300px]' src={authUser.profilePic} alt="Profile" />
              <p className='mt-4'>{authUser.fullName}</p>
            </div>
            <div>
              <h2>Starred Messages</h2>
              <div className="overflow-y-scroll h-[300px]">
                {
                  data && data.map(message =>
                    <div key={message._id} 
                    className={
                      ` chat ${authUser._id === message.senderId ? "chat-end" : "chat-start"}`
                    }
                    >
                      <div className='chat-bubble'>
                      {message.message}
                      <div className="chat-footer">
                        <p className='text-yellow-300'><FaStar /></p>
                        {authUser._id === message.senderId && <p>sent by you</p>}
                      </div>
                        </div>
                    </div>
                  )
                }
             
            </div>
          </div>
          <div className='flex justify-around items-center'>
            <LogoutButton />
            <button className='btn btn-success btn-ghost' onClick={() => document.getElementById("updateuserModal").showModal()}>
                  <FaEdit />
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Profile;
