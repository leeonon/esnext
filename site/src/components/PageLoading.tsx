import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="spinner mb-4 h-12 w-12 rounded-full border-b-4 border-t-4 border-red-900"></div>
      <div className="message text-red-900">{message}</div>
    </div>
  );
};

export default Loading;
