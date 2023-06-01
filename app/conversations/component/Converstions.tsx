"use client";

import React, { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { ConversationProps } from "@/types";
import { useRouter } from "next/navigation";
import Conversation from "./Conversation";
import { pusherClient } from "@/lib/pusher";
import GroupChatModal from "./GroupChatModal";
import useConversation from "@/hooks/useConverstion";
import { MdOutlineGroupAdd } from "react-icons/md";
import useGroupChatModal from "@/hooks/useGroupChatModal";
import useProfileDrawer from "@/hooks/useProfileDrawer";

interface Props {
  conversations: ConversationProps[];
  users: User[];
}

const Converstions = ({ conversations, users }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  const groupChatModal = useGroupChatModal();

  const profileDrawer = useProfileDrawer();

  const [convos, setConvos] = useState(conversations);

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => session?.user?.email, [session?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: ConversationProps) => {
      setConvos((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updatehandler = (conversation: ConversationProps) => {
      setConvos((current) =>
        current.map((convo) => {
          if (convo.id === conversation.id) {
            return { ...convo, messages: conversation.messages };
          }

          return convo;
        })
      );
    };

    const removeHandler = (conversation: ConversationProps) => {
      setConvos((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        profileDrawer.onClose();

        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);

    pusherClient.bind("converstion:update", updatehandler);

    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);

      pusherClient.unbind("conversation:new", newHandler);

      pusherClient.unbind("converstion:update", updatehandler);

      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal users={users} />

      <div
        className={`fixed bg-white inset-y-0 lg:block lg:left-24 lg:w-80 px-5 pb-20 lg:pb-0 border-r border-gray-200 overflow-y-auto ${
          isOpen ? "hidden" : "block left-0 w-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-neutral-800 font-bold py-4">Messages</h1>

          <button
            className="bg-gray-100 p-2 text-gray-600 rounded-full hover:opacity-75 transition"
            onClick={() => groupChatModal.onOpen()}
          >
            <MdOutlineGroupAdd size={20} />
          </button>
        </div>

        <div className="flex flex-col">
          {convos?.map((conversation) => (
            <Conversation
              key={conversation.id}
              conversation={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Converstions;
