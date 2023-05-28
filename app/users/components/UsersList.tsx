"use client";

import React from "react";
import UserBox from "./UserBox";
import { User } from "@prisma/client";

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  return (
    <div className="fixed bg-white inset-y-0 left-0 lg:left-24 w-full lg:w-80 px-5 pb-20 lg:pb-0 border-r border-gray-200 overflow-y-auto">
      <h1 className="text-xl text-neutral-800 font-bold py-4">People</h1>

      <div className="flex flex-col">
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
