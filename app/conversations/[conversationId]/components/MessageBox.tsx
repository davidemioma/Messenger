"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { MessageProps } from "@/types";
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/Avatar";

interface Props {
  message: MessageProps;
  isLast?: boolean;
}

const MessageBox = ({ message, isLast }: Props) => {
  const { data: session } = useSession();

  const currentUserMsg = session?.user?.email === message?.sender?.email;

  const seenList = (message.seen || [])
    .filter((user) => user.email !== message.sender.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <div className={`flex p-4 gap-3 ${currentUserMsg && "justify-end"}`}>
      <div className={`${currentUserMsg && "order-2"}`}>
        <Avatar user={message.sender} />
      </div>

      <div className={`flex flex-col gap-2 ${currentUserMsg && "items-end"}`}>
        <p className="text-sm text-gray-500">{message.sender.name}</p>

        <p className="text-sm text-gray-400">
          {format(new Date(message.createdAt), "p")}
        </p>

        {message.body && (
          <p
            className={`${
              currentUserMsg ? "bg-sky-500 text-white" : "bg-gray-100"
            } text-sm w-fit rounded-full px-3 py-2`}
          >
            {message.body}
          </p>
        )}

        {message.image && (
          <div className="relative w-[250px] h-[250px] rounded-md overflow-hidden">
            <Image
              className="object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
              src={message.image}
              fill
              alt=""
            />
          </div>
        )}

        {isLast && currentUserMsg && seenList.length > 0 && (
          <p className="text-sm text-gray-500 font-light">{`Seen by ${seenList}`}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
