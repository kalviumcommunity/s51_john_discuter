import { create } from "zustand";

export const useStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("user")) || null,
  setAuthUser: (data) =>
    set({
      authUser: data,
    }),
  selectedConversation: {},
  setSelectedConversation: (fullName, id, profilePic) =>
    set({
      selectedConversation: {fullName: fullName, id: id, profilePic: profilePic}
    }),
  selectedUser: null,
  setSelectedUser: (fullName) =>
    set({
      selectedUser: fullName,
    }),
  onlineUsers: [],
  setOnlineUsers: (users) =>
    set({
      onlineUsers: users,
    }),
  socket: null,
  setSocket: (sock) =>
    set({
      socket: sock,
    }),
  messages: [],
  setMessages: (ms) =>
    set({
      messages: ms,
    }),
  latestMessages: {},
  setLatestMessage: (newMessage, friendID) =>
    set((state) => ({
      latestMessages: { ...state.latestMessages, [friendID]: newMessage },
    })),
  users: [],
  setUsers: (users) =>
    set({
      users: users,
    }),
  filteredUsers: [],
  setFilteredUsers: (users) =>
    set({
      filteredUsers: users,
    }),
  messageTobeEdited: {},
  setMessageTobeEdited: (id, message, isStarred) =>
    set({
      messageTobeEdited: { id: id, message: message, isStarred: isStarred },
    }),
  
}));
