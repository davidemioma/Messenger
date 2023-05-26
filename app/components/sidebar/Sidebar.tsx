import React from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface Props {
  children: React.ReactNode;
}

const Sidebar = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <Desktop currentUser={currentUser} />

      <Mobile />

      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
