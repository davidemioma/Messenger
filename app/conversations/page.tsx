"use client";

import useConversation from "@/hooks/useConverstion";
import EmptyState from "../components/EmptyState";

export default function Conversations() {
  const { isOpen } = useConversation();

  return (
    <div
      className={`h-screen lg:pl-80 lg:block ${isOpen ? "block" : "hidden"}`}
    >
      <EmptyState />
    </div>
  );
}
