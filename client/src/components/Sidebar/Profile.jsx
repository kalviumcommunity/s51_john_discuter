import React, { useState } from 'react'
import axios from "axios"
import { useStore } from '../../app/store'
import { useEffect } from 'react'
import Cookies from "js-cookie"
import { FaStar } from "react-icons/fa";

const Profile = () => {
  const { authUser, messages } = useStore()
  const [loading, setLoading] = useState()
  const [data, setData] = useState()
  const jwt = Cookies.get("jwt")
  const fetchStarredMessages = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`https://s51-john-discuter.onrender.com/message/starred/${authUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      )
      console.log(res.data)
      setData(res.data.starredMessages)
    } catch (error) {
      console.log(error.messsage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchStarredMessages()
  }, [messages])
  return (
    <div>
      <button className="btn" onClick={() => document.getElementById('profileModal').showModal()}>open modal</button>
      <dialog id="profileModal" className="modal">
        <div className="modal-box">
          <img src={authUser.profilePic} />
          <p>{authUser.fullName}</p>
            <p>Starred Messages</p>
          <div className="overflow-y-scroll h-[200px]">
            {
            data && data.map(message =>
              <div 
              key={message._id}
              className="chat-bubble">
                {message.message}
                <div className="chat-footer">
                  <FaStar />
                </div>
              </div>
            )
          }</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Profile
