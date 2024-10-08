import React from 'react'
import { useStore } from "../../app/store.js"
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
const MessageContainer = () => {
  const { selectedConversation, messages, onlineUsers } = useStore()
  const isOnline = onlineUsers.includes(selectedConversation.id);

  return (
    <div className='h-[800px]'>
      <div className="flex items-center w-[1000px] justify-around">
        <div className={`avatar w-[70px] h-[70px]
             ${isOnline ? "online" : "offline"} mr-5`}>
          <img className='rounded-full h-[100px] w-[150px]' src={selectedConversation.profilePic} />
        </div>
        <h1>{selectedConversation.fullName}</h1>
      </div>
      {
        !messages ?
          <h1 className="text-red-600">Start a conversation with {selectedConversation.fullName}</h1>
          : <Messages />
      }
      <MessageInput />
    </div>
  )
}

export default MessageContainer
