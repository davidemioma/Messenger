"use client";

import React from "react";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  secondary?: boolean;
  ordinary?: boolean;
  onClick?: () => void;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
  danger,
  secondary,
  ordinary,
}: Props) => {
  return (
    <button
      className={`flex items-center justify-center px-3 py-1.5 text-sm font-semibold rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        fullWidth && "w-full"
      } ${disabled && "cursor-not-allowed opacity-50"} ${
        secondary && "text-gray-900 bg-white"
      } ${
        danger &&
        "bg-rose-500 text-white hover:bg-red-600 focus-visible:outline-rose-600"
      } ${
        ordinary &&
        "bg-sky-500 hover:bg-sky-600 text-white focus-visible:outline-sky-600"
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
