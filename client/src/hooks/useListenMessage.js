import { useEffect } from "react";
import { useStore } from "../app/store";

export const useListenMessage = () => {
  const { setMessages, messages, socket, setLatestMessage, authUser } = useStore();
  console.log("listening messages", socket)
  const handleNewMessage = (newMessage) => {
    console.log(messages, newMessage)
    setMessages([...messages, newMessage]);
    const friendID = newMessage.senderId !== authUser._id ? newMessage.senderId : newMessage.receiverId;
    setLatestMessage(newMessage.message, friendID);
  };
  const handleDeleteMessage = (deletedmessage) => {
    setMessages(
      messages.filter((message) => message._id !== deletedmessage._id)
    );
  };
  const handleUpdateMessage = (newMessage) => {
    console.log(newMessage)
    const updatedMessages = messages.map((msg) =>
      msg._id === newMessage._id
        ? { ...msg, message: newMessage.message, updatedAt: new Date() }
        : msg
    );
    setMessages(updatedMessages);
  }

  useEffect(() => {
    console.log("listening from useeffect")
    socket?.on("newMessage", handleNewMessage)
    socket?.on("deletemessage", handleDeleteMessage);
    socket?.on("updatedmessage", handleUpdateMessage);
  }, [socket, messages, setLatestMessage, setLatestMessage]);
};
