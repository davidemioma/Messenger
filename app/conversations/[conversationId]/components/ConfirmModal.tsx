"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";
import useConversation from "@/hooks/useConverstion";
import useConfirmModal from "@/hooks/useConfirmModal";
import Button from "@/app/components/Button";

const ConfirmModal = () => {
  const confirmModal = useConfirmModal();

  const router = useRouter();

  const { conversationId } = useConversation();

  const [loading, setLoading] = useState(false);

  const onDelete = useCallback(() => {
    setLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        toast.success("Conversation deleted");

        confirmModal.onClose();

        router.push("/conversations");

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [conversationId, router, confirmModal]);

  return (
    <Modal isOpen={confirmModal.isOpen} onClose={() => confirmModal.onClose()}>
      <div className="flex gap-3">
        <div className="bg-red-100 flex flex-shrink-0 items-center justify-center w-12 sm:w-10 h-12 sm:h-10 rounded-full">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-bold leading-6 text-gray-900">
            Delete Conversation
          </h3>

          <p className="text-gray-500">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-3 mt-5 sm:mt-4">
        <Button onClick={onDelete} danger disabled={loading}>
          Delete
        </Button>

        <Button onClick={() => confirmModal.onClose()} disabled={loading}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
