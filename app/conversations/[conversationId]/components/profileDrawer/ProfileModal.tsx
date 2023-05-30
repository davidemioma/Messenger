"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ children, isOpen, onClose }: Props) => {
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
        className="fixed inset-0 z-40 overflow-hidden"
        onClick={handleClose}
      />

      <div
        className={`absolute inset-0 z-30 bg-black/70 transition-opacity duration-500 ${
          showModal ? "opacity-100 ease-out" : "opacity-0 ease-in"
        }`}
      />

      <div
        className={`bg-white absolute z-40 inset-y-0 right-0 w-full max-w-md py-6 overflow-x-hidden overflow-y-auto ${
          showModal
            ? "translate-x-0 duration-500"
            : "translate-x-full duration-200"
        } transition ease-in-out shadow-xl`}
      >
        <div className="px-4 sm:px-6">
          <div className="flex justify-end items-center">
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

export default ProfileModal;
