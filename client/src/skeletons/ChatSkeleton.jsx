const ChatSkeleton = () => {
  return (
    <div className="flex gap-4 items-center m-3">
      <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
