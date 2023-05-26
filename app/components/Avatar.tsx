"use client";

import React from "react";
import Image from "next/image";

import { User } from "@prisma/client";

interface Props {
  user?: User;
}

const Avatar = ({ user }: Props) => {
  return (
    <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden">
      <Image
        className="object-cover"
        src={user?.image || "/assets/placeholder.jpeg"}
        fill
        alt="profile"
      />
    </div>
  );
};

export default Avatar;
