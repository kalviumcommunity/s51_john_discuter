import React from "react";
import { useStore } from "../../app/store";
import { format, formatDistanceToNow } from "date-fns";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

const Message = ({ message, updateDialogRef }) => {
  const authUser = useStore().authUser;
  const setMessageTobeEdited = useStore().setMessageTobeEdited;
  const isStarred = message.starred.includes(authUser._id)
  const current_user_id =
    authUser._id || JSON.parse(localStorage.getItem("user"))._id;

  const createdAt = new Date(message.createdAt);
  const updatedAt = new Date(message.updatedAt);

  const displayTime = (date) => {
    const diffInHours = Math.floor((new Date() - date) / (1000 * 60 * 60));
    if (diffInHours < 3) {
      return `${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    return format(date, "PPpp");
  };

  const handleMessageEdit = () => {
    if (current_user_id === message.senderId) {
      setMessageTobeEdited(message._id, message.message, isStarred);
      updateDialogRef.current.showModal();
    }
  };

  const EditedLabel = ({ isEdited }) => {
    return isEdited ? (
      <p style={{ textAlign: "right" }} className="text-red-400">
        edited
      </p>
    ) : null;
  };


  return (
    <div
      onClick={handleMessageEdit}
      className={`chat ${current_user_id === message.receiverId ? "chat-start" : "chat-end"
        }`}
    >
      <div className="chat-bubble">
        {message.message}
        <EditedLabel isEdited={createdAt.getTime() !== updatedAt.getTime()} />
        <p>{
          isStarred
            && <FaStar />
        }</p>
      </div>
      <div className="chat-footer">
        <p>{displayTime(createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
