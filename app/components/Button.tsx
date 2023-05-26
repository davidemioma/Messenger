"use client";

import React from "react";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  testId?: string;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
  danger,
  secondary,
  testId,
}: Props) => {
  return (
    <button
      data-testId={testId}
      className={`flex items-center justify-center px-3 py-1.5 text-sm font-semibold rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        fullWidth && "w-full"
      } ${disabled && "cursor-not-allowed opacity-50"} ${
        secondary ? "text-gray-900" : "text-white"
      } ${
        danger
          ? "bg-rose-500 hover:bg-red-600 focus-visible:outline-rose-600"
          : "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
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
