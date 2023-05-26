import Sidebar from "../components/sidebar/Sidebar";

export const metadata = {
  title: "Messenger-Users",
  description: "Users",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-screen overflow-hidden">{children}</div>
    </Sidebar>
  );
}
