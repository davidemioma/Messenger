import { getUsers } from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UsersList from "./components/UsersList";

export const metadata = {
  title: "Messenger-Users",
  description: "Users",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-screen overflow-hidden">
        <UsersList users={users} />

        {children}
      </div>
    </Sidebar>
  );
}
