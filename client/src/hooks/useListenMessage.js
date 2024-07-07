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

  useEffect(() => {
    console.log("listening from useeffect")
    socket?.on("newMessage", handleNewMessage)
  }, [socket, messages, setLatestMessage, setLatestMessage]);
};
