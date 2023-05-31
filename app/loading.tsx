import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-t border-l border-sky-500 animate-spin" />
    </div>
  );
};

export default Loading;
