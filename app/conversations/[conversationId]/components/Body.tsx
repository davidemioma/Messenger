"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { find } from "lodash";
import MessageBox from "./MessageBox";
import { MessageProps } from "@/types";
import { pusherClient } from "@/lib/pusher";
import useConversation from "@/hooks/useConverstion";

interface Props {
  initialMessages: MessageProps[];
}

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    bottomRef.current?.scrollIntoView();

    const messageHandler = (message: MessageProps) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: MessageProps) => {
      setMessages((current) =>
        current.map((message) => {
          if (message.id === newMessage.id) {
            return newMessage;
          }

          return message;
        })
      );
    };

    pusherClient.bind("message:new", messageHandler);

    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);

      pusherClient.unbind("message:new", messageHandler);

      pusherClient.unbind("message:update", updateMessageHandler);
    };
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
