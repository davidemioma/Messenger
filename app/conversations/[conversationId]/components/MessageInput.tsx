"use client";

import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput = ({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}: Props) => {
  return (
    <div className="relative w-full">
      <input
        className="w-full bg-neutral-100 text-black py-2 px-4 rounded-full focus:outline-none"
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </div>
  );
};

export default MessageInput;
