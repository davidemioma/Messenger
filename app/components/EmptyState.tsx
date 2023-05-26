"use client";

import React from "react";

const EmptyState = () => {
  return (
    <div className="bg-gray-100 h-full flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-gray-900 text-xl font-semibold">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
