"use client";

import React from "react";
import { ConversationProps } from "@/types";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConverstion";
import { MdOutlineGroupAdd } from "react-icons/md";
import Conversation from "./Conversation";

interface Props {
  conversations: ConversationProps[];
}

const Converstions = ({ conversations }: Props) => {
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <div
      className={`fixed bg-white inset-y-0 lg:block lg:left-24 lg:w-80 px-5 pb-20 lg:pb-0 border-r border-gray-200 overflow-y-auto ${
        isOpen ? "hidden" : "block left-0 w-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-neutral-800 font-bold py-4">Messages</h1>

        <button className="bg-gray-100 p-2 text-gray-600 rounded-full hover:opacity-75 transition">
          <MdOutlineGroupAdd size={20} />
        </button>
      </div>

      <div className="flex flex-col">
        {conversations?.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            selected={conversationId === conversation.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Converstions;
