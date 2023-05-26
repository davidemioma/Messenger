"use client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import useRoute from "@/hooks/useRoute";
import Desktopitem from "./Desktopitem";
import Avatar from "../Avatar";

interface Props {
  currentUser: User | null;
}

const Desktop = ({ currentUser }: Props) => {
  const route = useRoute();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-between lg:bg-white lg:fixed lg:left-0 lg:inset-y-0 lg:w-24 lg:z-40 lg:py-4 lg:border-r lg:overflow-y-auto">
      <nav className="flex flex-col justify-between">
        <ul className="flex flex-col items-start gap-1" role="list">
          {route.map((item) => (
            <Desktopitem
              key={item.label}
              label={item.label}
              href={item.href}
              Icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>

      <nav className="flex flex-col items-center justify-between">
        <div
          className="cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser!} />
        </div>
      </nav>
    </div>
  );
};

export default Desktop;
