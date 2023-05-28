"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Avatar from "@/app/components/Avatar";

interface Props {
  user: User;
}

const UserBox = ({ user }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const createConverstion = useCallback(() => {
    setLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, router]);

  return (
    <button
      className="relative bg-white w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-100 transition disabled:cursor-not-allowed"
      onClick={createConverstion}
      disabled={loading}
    >
      <Avatar user={user} />

      <div className="flex-1 text-left">
        <p className="text-sm text-gray-900 font-medium">{user.name}</p>
      </div>
    </button>
  );
};

export default UserBox;
