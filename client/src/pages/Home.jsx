import React from 'react'
import {useStore} from "../app/store.js"
import Sidebar, {} from "../components/Sidebar/Sidebar.jsx"
import MessageContainer from '../components/messages/MessageContainer.jsx'

const Home = () => {
  const selectedConversation = useStore().selectedConversation 
  return (
    <div className='flex font-mono'>
      <Sidebar />
      {
        selectedConversation ? 
          <MessageContainer />
          : <h1 className="text-red-600">select a convo</h1>
      }
    </div>
  )
}

export default Home
