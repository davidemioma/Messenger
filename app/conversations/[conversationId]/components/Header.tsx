"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ConversationProps } from "@/types";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import useActivelist from "@/hooks/useActiveList";
import useProfileDrawer from "@/hooks/useProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface Props {
  conversation: ConversationProps;
}

const Header = ({ conversation }: Props) => {
  const profileDrawer = useProfileDrawer();

  const otherUser = useOtherUser(conversation);

  const { members } = useActivelist();

  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <div className="bg-white w-full flex items-center justify-between py-3 px-4 lg:px-6 border-b shadow-sm">
      <div className="flex items-center gap-3">
        <Link
          href={"/conversations"}
          className="lg:hidden text-sky-500 hover:text-sky-600 cursor-pointer transition"
        >
          <HiChevronLeft size={32} />
        </Link>

        {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )}

        <div className="flex flex-col">
          <p>{conversation.name || otherUser.name}</p>

          <p className="text-sm text-neutral-500 font-light">{statusText}</p>
        </div>
      </div>

      <HiEllipsisHorizontal
        className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        size={32}
        onClick={() => profileDrawer.onOpen()}
      />
    </div>
  );
};

export default Header;
