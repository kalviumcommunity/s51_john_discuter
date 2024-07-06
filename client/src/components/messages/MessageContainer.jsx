import React from 'react'
import { useStore } from "../../app/store.js"
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
const MessageContainer = () => {
  const { selectedConversation, messages } = useStore()

  return (
    <div>
      <div className="flex items-center">
        <img src={selectedConversation.profilePic} className="avatar rounded-full h-[70px] pr-10" />
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
