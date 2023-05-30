"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageBox from "./MessageBox";
import { MessageProps } from "@/types";
import useConversation from "@/hooks/useConverstion";

interface Props {
  initialMessages: MessageProps[] | null;
}

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={messages.length - 1 === i}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default Body;
