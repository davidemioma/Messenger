"use client";

import React from "react";
import useRoute from "@/hooks/useRoute";
import useConversation from "@/hooks/useConverstion";
import Mobileitem from "./Mobileitem";

const Mobile = () => {
  const route = useRoute();

  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
    <div className="fixed bottom-0 z-40 flex items-center justify-between bg-white w-full border-t lg:hidden">
      {route.map((item) => (
        <Mobileitem
          key={item.label}
          label={item.label}
          href={item.href}
          Icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default Mobile;
