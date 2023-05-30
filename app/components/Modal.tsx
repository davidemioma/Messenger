"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 700);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-hidden"
        onClick={handleClose}
      />

      <div
        className={`absolute inset-0 z-40 bg-gray-500/75 transition-opacity ${
          showModal
            ? "opacity-100 ease-out duration-300"
            : "opacity-0 ease-in duration-200"
        }`}
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full sm:max-w-lg overflow-hidden">
        <div
          className={`bg-white w-full p-4 sm:p-6 rounded-lg shadow-xl transition-all ease-in-out ${
            showModal
              ? "-translate-y-0 opacity-100 duration-300"
              : "translate-y-4 opacity-0 duration-200"
          }`}
        >
          <div className="flex justify-end items-center pb-4">
            <button
              className="bg-white text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              onClick={handleClose}
              type="button"
            >
              <IoClose size={24} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
