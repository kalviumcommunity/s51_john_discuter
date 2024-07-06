import React, { useEffect, useRef } from 'react';
import { useStore } from '../../app/store';
import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message';
import ChatBubbleSkeleton from '../../skeletons/ChatBubbleSkeleton';

const Messages = () => {
  const { selectedConversation, messages } = useStore();
  const { loading, getMessages } = useGetMessages();
  const ref = useRef()

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        await getMessages();
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        bottom: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className='h-[500px] w-[1000px] overflow-y-scroll'>
      {loading ? (
        <div className="flex-col items-end h-full">
          <ChatBubbleSkeleton start={true} />
          <ChatBubbleSkeleton start={false} />
          <ChatBubbleSkeleton start={true} />
          <ChatBubbleSkeleton start={false} />
        </div>
      ) : messages && messages.length === 0 && JSON.stringify(selectedConversation) !== "{}" ? (
        <>
          <h1 className="text-red-500">Start a conversation{selectedConversation.fullName} j</h1>
          <h2 className="text-blue-400">Say Hi</h2>
        </>
      ) : (
        messages.map((message) => (
          <Message
            message={message}
            key={message._id}
          />
        ))
      )
      }
    </div>
  );
};

export default Messages;
