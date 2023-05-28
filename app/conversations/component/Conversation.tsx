"use client";

import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { ConversationProps } from "@/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface Props {
  conversation: ConversationProps;
  selected?: boolean;
}

const Conversation = ({ conversation, selected }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();

  //Hook to seperate the current user from other users
  const otherUser = useOtherUser(conversation);

  //Getting the last message
  const lastMessage = useMemo(() => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    return lastMessage;
  }, [conversation.messages]);

  //Checking if current user has seen the message
  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArr = lastMessage.seen || [];

    if (!session?.user?.email) return false;

    return (
      seenArr.findIndex((user) => user.email === session?.user?.email) !== -1
    );
  }, [session?.user?.email, lastMessage]);

  //Returns a text depending on the last message
  const text = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  const onClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  return (
    <div
      className={`relative ${
        selected ? "bg-neutral-100" : "bg-white"
      } w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-100 transition`}
      onClick={onClick}
    >
      <Avatar user={otherUser} />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-900 font-medium">
            {conversation?.name || otherUser?.name}
          </p>

          {lastMessage?.createdAt && (
            <p className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>

        <p
          className={`text-sm ${
            hasSeen ? "text-gray-500" : "text-black font-medium"
          } truncate`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
