import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useStore } from '../app/store'
import toast from 'react-hot-toast'
import Cookies from "js-cookie"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { selectedConversation } = useStore()
    const sendMessage = async (message) => {
        try {
            setLoading(true)
            const jwt = Cookies.get('jwt');
      const res = await axios.post(
        `https://s51-john-discuter.onrender.com/message/send/${selectedConversation.id}`,
        {
            message
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
        } catch (error) {
            console.error(error.message)
            toast.error("error while sending message, try again")
        }finally{
            setLoading(false)
        }
    }
  return {loading, sendMessage}
}

export default useSendMessage
