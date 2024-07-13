import Conversation from "./Conversation";
import ChatSkeleton from "../../skeletons/ChatSkeleton";
import { useStore } from "../../app/store";

const Conversations = () => {
  const users = useStore().filteredUsers;

  return (
    <div className="flex flex-col gap-4 h-[600px] overflow-y-scroll"> 
      { 
        users.map((user) => <Conversation key={user._id} user={user} />)
      }
    </div>
  );
};

export default Conversations;
