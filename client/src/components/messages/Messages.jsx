import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../app/store';
import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message';
import ChatBubbleSkeleton from '../../skeletons/ChatBubbleSkeleton';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from "js-cookie";
import { FiEdit, FiStar } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Messages = () => {
  const { selectedConversation, messages, messageTobeEdited, setMessageTobeEdited, setMessages } = useStore();
  const { loading, getMessages } = useGetMessages();
  const [loadingdelUp, setLoadingUpdel] = useState({});
  const ref = useRef();
  const updateDialogRef = useRef();
  const jwt = Cookies.get('jwt');
  const starRef = useRef()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const updateMessageRefModal = useRef();

  const starMessage = async () => {
    try {
      setLoadingUpdel({
        deletion: false,
        updation: true,
        star: true
      });
      const res = await axios.patch(`https://s51-john-discuter.onrender.com/message/star/${messageTobeEdited.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      const updatedMessage = res.data.starredMessage;
      const updatedMessages = messages.map((msg) =>
        msg._id === updatedMessage._id ? { ...msg, starred: updatedMessage.starred } : msg
      );
      setMessages(updatedMessages);
      starRef.current.close()
      console.log(res.data, "starred message");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingUpdel({
        deletion: false,
        updation: false,
        star: false
      });
      updateDialogRef.current.close();
    }
  }

  const deleteMessage = async () => {
    try {
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: true,
        updation: false,
        star: false,
      });
      console.log(jwt);
      const res = await axios.delete(
        `https://s51-john-discuter.onrender.com/message/deletemsg/${messageTobeEdited.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log(res.data);
      setMessageTobeEdited(null, null);
    } catch (error) {
      console.error("Error deleting message:", error.message);
      toast.error("Error while deleting message, try again");
    } finally {
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: false,
        updation: false,
        star: false
      });
      updateDialogRef.current.close();
    }
  };

  const updateMessage = () => {
    reset({ message: messageTobeEdited.message });
    updateDialogRef.current.close();
    updateMessageRefModal.current.showModal();
  };

  const handleUpdateMessage = async (data) => {
    try {
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: false,
        updation: true,
        star: false
      });
      const res = await axios.put(
        `https://s51-john-discuter.onrender.com/message/updatemsg/${messageTobeEdited.id}`,
        { message: data.message },
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
    } finally {
      setLoadingUpdel({
        ...loadingdelUp,
        deletion: false,
        updation: false,
        star: false
      });
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
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, selectedConversation, loading]);

  return (
    <div ref={ref} className='h-[650px] w-[1150px] overflow-y-scroll'>
      <dialog id="updateDeleteDialog" className="modal" ref={updateDialogRef}>
        <div className='modal-box'>
          <p className="text-purple-400">{messageTobeEdited.message}</p>
          <div className="modal-action">
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteMessage();
              }}
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
              onClick={(e) => {
                e.preventDefault();
                updateMessage();
              }}
            >
              <FiEdit />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                starMessage();
              }}
              className={`btn ${!messageTobeEdited.isStarred && "btn-outline"} btn-warning`}
            >
              {
                loadingdelUp.star 
                ? <span className='loading loading-spinner loading-sm'></span>
                : messageTobeEdited.isStarred
                  ? <FaStar />
                  : <CiStar />
              }
            </button>
          </div>
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
      <dialog id="starMessage" className="modal" ref={starRef}>
        <div className='modal-box'>
          <p className="text-purple-400">{messageTobeEdited.message}</p>
          
          <div className="modal-action">
            
            <button
              onClick={(e) => {
                e.preventDefault();
                starMessage();
              }}
              className={`btn ${!messageTobeEdited.isStarred && "btn-outline"} btn-warning`}
            >
              {
                loadingdelUp.star 
                ? <span className='loading loading-spinner loading-sm'></span>
                : messageTobeEdited.isStarred
                  ? <FaStar />
                  : <CiStar />
              }
            </button>
          </div>
        </div>
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
          <h1 className="text-blue-500 mt-10">say hi to {selectedConversation.fullName}</h1>
        </>
      ) : (
        messages.map((message) => (
          <Message
            updateDialogRef={updateDialogRef}
            starRef={starRef}
            message={message}
            key={message._id}
          />
        ))
      )}
    </div>
  );
};

export default Messages;
