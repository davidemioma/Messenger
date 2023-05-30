"use client";

import React, { useMemo } from "react";
import ProfileModal from "./ProfileModal";
import { format } from "date-fns";
import { IoTrash } from "react-icons/io5";
import { ConversationProps } from "@/types";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import useProfileDrawer from "@/hooks/useProfileDrawer";
import useConfirmModal from "@/hooks/useConfirmModal";

interface Props {
  conversation: ConversationProps;
}

const ProfileDrawer = ({ conversation }: Props) => {
  const profileDrawer = useProfileDrawer();

  const confirmModal = useConfirmModal();

  const otherUser = useOtherUser(conversation);

  const joinedDate = useMemo(() => {
    return format(new Date(conversation.createdAt), "PP");
  }, [conversation.createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  const status = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <ProfileModal
      isOpen={profileDrawer.isOpen}
      onClose={() => profileDrawer.onClose()}
    >
      <div className="relative flex-1 mt-6">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Avatar user={otherUser} />
          </div>

          <p>{title}</p>

          <p className="text-sm text-gray-500">{status}</p>

          <button
            className="flex flex-col items-center gap-3 mt-8 hover:opacity-75 transition"
            onClick={() => confirmModal.onOpen()}
          >
            <div className="bg-neutral-100 flex items-center justify-center w-10 h-10 rounded-full">
              <IoTrash size={20} />
            </div>

            <p className="text-sm text-neutral-600 font-light">Delete</p>
          </button>
        </div>

        <div className="w-full py-5 sm:px-0">
          <dl className="px-4 sm:px-6 space-y-8 sm:space-y-6">
            {!conversation.isGroup && (
              <div className="text-sm space-y-1">
                <dt className="font-medium text-gray-500 sm:w-40">Email</dt>

                <dd className="text-gray-900 sm:col-span-2">
                  {otherUser.email}
                </dd>
              </div>
            )}

            {!conversation.isGroup && (
              <>
                <hr />

                <div className="text-sm space-y-1">
                  <dt className="font-medium text-gray-500 sm:w-40">Joined</dt>

                  <dd className="text-gray-900 sm:col-span-2">
                    <time dateTime={joinedDate}>{joinedDate}</time>
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>
    </ProfileModal>
  );
};

export default ProfileDrawer;
