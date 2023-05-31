"use client";

import React from "react";
import Image from "next/image";
import Modal from "@/app/components/Modal";
import useImageModal from "@/hooks/useImageModal";

interface Props {
  src: string;
}

const ImageModal = ({ src }: Props) => {
  const imageModal = useImageModal();

  return (
    <Modal isOpen={imageModal.isOpen} onClose={() => imageModal.onClose()}>
      <div className="relative w-full h-80 overflow-hidden">
        <Image className="object-cover" src={src} fill alt="Image" />
      </div>
    </Modal>
  );
};

export default ImageModal;
