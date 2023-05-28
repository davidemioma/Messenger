import { getConversations } from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import Converstions from "./component/Converstions";

export const metadata = {
  title: "Messenger-Users",
  description: "Users",
};

export default async function ConverstionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const converstions = await getConversations();

  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-screen overflow-hidden">
        <Converstions conversations={converstions} />

        {children}
      </div>
    </Sidebar>
  );
}
