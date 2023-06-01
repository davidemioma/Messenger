"use client";

import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import useActivelist from "@/hooks/useActiveList";

interface Props {
  user?: User;
}

const Avatar = ({ user }: Props) => {
  const { members } = useActivelist();

  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden">
        <Image
          className="object-cover"
          src={user?.image || "/assets/placeholder.jpeg"}
          fill
          alt="profile"
        />
      </div>

      {isActive && (
        <div className="absolute top-0 right-0 bg-green-500 w-2 h-2 md:h-3 md:w-3 rounded-full ring-2 ring-white" />
      )}
    </div>
  );
};

export default Avatar;
