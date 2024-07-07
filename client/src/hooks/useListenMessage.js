import { useEffect } from "react";
import { useStore } from "../app/store";

export const useListenMessage = () => {
  const { setMessages, messages, socket, setLatestMessage, authUser } = useStore();
  console.log("listening messages", socket);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log(messages, newMessage);
      setMessages([...messages, newMessage]);
      const friendID = newMessage.senderId !== authUser._id ? newMessage.senderId : newMessage.receiverId;
      setLatestMessage(newMessage.message, friendID);
    };

    const handleDeleteMessage = (deletedMessage) => {
      setMessages(messages.filter((message) => message._id !== deletedMessage._id));
    };

    const handleUpdateMessage = (updatedMessage) => {
      const updatedMessages = messages.map((msg) =>
        msg._id === updatedMessage._id ? { ...msg, message: updatedMessage.message, updatedAt: new Date() } : msg
      );
      setMessages(updatedMessages);
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
      socket.on("deletemessage", handleDeleteMessage);
      socket.on("updatedmessage", handleUpdateMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
        socket.off("deletemessage", handleDeleteMessage);
        socket.off("updatedmessage", handleUpdateMessage);
      }
    };
  }, [socket, messages, setLatestMessage, setMessages, authUser]);
};
