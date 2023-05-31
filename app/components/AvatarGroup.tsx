"use client";

import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";

interface Props {
  users?: User[];
}

const AvatarGroup = ({ users = [] }: Props) => {
  const slicedUsers = users.slice(0, 3);

  const postion = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative w-11 h-11 overflow-hidden">
      {slicedUsers.map((user, i: number) => (
        <div
          key={user.id}
          className={`absolute ${
            postion[i as keyof typeof postion]
          } w-5 h-5 rounded-full overflow-hidden`}
        >
          <Image
            className="object-cover"
            src={user?.image || "/assets/placeholder.jpeg"}
            fill
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
