import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../app/store';
import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message';
import ChatBubbleSkeleton from '../../skeletons/ChatBubbleSkeleton';
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from "js-cookie"
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Messages = () => {
  const { selectedConversation, messages, messageTobeEdited, setMessageTobeEdited } = useStore();
  const { loading, getMessages } = useGetMessages();
  const [loadingdelUp, setLoadingUpdel] = useState({})
  const ref = useRef()
  const updateDialogRef = useRef()
  const jwt = Cookies.get('jwt');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const updateMessageRefModal = useRef()

  const deleteMessage = async () => {
    try {
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: true,
        updation: false,
      })
      console.log(jwt);
      const res = await axios.delete(
        `https://s51-john-discuter.onrender.com/message/deletemsg/${messageTobeEdited.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log(res.data)
      setMessageTobeEdited(null, null);
    } catch (error) {
      console.error("Error deleting message:", error.message);
      toast.error("Error while deleting message, try again");
    }finally{
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: false,
        updation: false,
      })
    }
  };

  const updateMessage = () => {
    reset({ message: messageTobeEdited.message });
    updateMessageRefModal.current.showModal();
  };

  const handleUpdateMessage = async (data) => {
    try {
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: false,
        updation: true,
      })
      const res = await axios.put(
        `https://s51-john-discuter.onrender.com/message/updatemsg/${messageTobeEdited.id}`,
        { message: data.message},
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log("Response from server:", res.data);

      updateMessageRefModal.current.close();
    } catch (error) {
      console.error("Error updating message:", error.message);
    }finally{
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: false,
        updation: false,
      })
    }
  };

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
    <div ref={ref} className='h-[500px] w-[1000px] overflow-y-scroll'>
      <dialog id="updateDeleteDialog" className="modal" ref={updateDialogRef}>
        <div className="modal-box">
          <p className="text-purple-400">{messageTobeEdited.message}</p>
          <p className="text-purple-400">{messageTobeEdited.id}</p>
          <form method="dialog" className="modal-backdrop">
            <div className="modal-action">
              <button
                onClick={deleteMessage}
                className="btn btn-outline btn-error mr-8"
              >
                {
                  loadingdelUp.deletion 
                  ? <span className='loading loading-spinner loading-md'></span>
                  : <MdDeleteForever />
                  }
              </button>
              <button
                className="btn btn-outline btn-info"
                onClick={updateMessage}
              >
                <FiEdit />
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="updateInput" className="modal" ref={updateMessageRefModal}>
        <form onSubmit={handleSubmit(handleUpdateMessage)}>
          <div className="modal-box">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
              {...register("message", { required: true })}
              defaultValue={messageTobeEdited.message}
            />
            {errors.message && <span>This field is required</span>}
            <div className="modal-action">
              <button className="btn btn-outline btn-success" type="submit">
              {
                  loadingdelUp.updation 
                  ? <span className='loading loading-spinner loading-md'></span>
                  : <IoCheckmarkDoneCircle />
              }
              </button>
            </div>
          </div>
        </form>
      </dialog>
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
            updateDialogRef={updateDialogRef}
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
