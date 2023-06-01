import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import ConfirmModal from "./components/ConfirmModal";
import { getMessages } from "@/app/actions/getMessages";
import ProfileDrawer from "./components/profileDrawer/ProfileDrawer";
import { getConversationById } from "@/app/actions/getCoversationById";

interface Params {
  conversationId: string;
}

export default async function Conversation({ params }: { params: Params }) {
  const { conversationId } = params;

  const conversation = await getConversationById(conversationId);

  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-[340px] h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-[340px] h-full">
      <div className="h-full flex flex-col">
        <ProfileDrawer conversation={conversation} />

        <Header conversation={conversation} />

        <Body initialMessages={messages!} />

        <Form />

        <ConfirmModal />
      </div>
    </div>
  );
}
