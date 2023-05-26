"use client";

import React from "react";
import { IconType } from "react-icons";

interface Props {
  testId?: string;
  Icon: IconType;
  onClick: () => void;
}

const AuthSocialBtn = ({ Icon, onClick, testId }: Props) => {
  return (
    <button
      className="bg-white w-full flex items-center justify-center px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
      type="button"
      data-testId={testId}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialBtn;
