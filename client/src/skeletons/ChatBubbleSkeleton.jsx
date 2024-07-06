import React from 'react';
import "./Skeleton.css";

const ChatBubbleSkeleton = ({ start }) => {
  return (
    <div className={`loading-skeleton ${start ? "chat-start" : "chat-end"}`}>
      <div className={`skeleton-bubble ${start ? "start" : "end"}`}></div>
      <div className="skeleton-footer"></div>
    </div>
  );
};

export default ChatBubbleSkeleton;
