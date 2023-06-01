"use client";

import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: Props) => {
  return (
    <div className="space-y-2">
      <label
        className="text-sm text-gray-900 font-medium leading-6"
        htmlFor={id}
      >
        {label}
      </label>

      <input
        className={`form-input w-full text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset rounded-md shadow-sm ${
          errors[id] ? "focus:ring-rose-500" : "focus:ring-sky-600"
        } ${disabled && "cursor-not-allowed opacity-50"}`}
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
