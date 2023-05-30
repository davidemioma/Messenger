import EmptyState from "@/app/components/EmptyState";
import { getMessages } from "@/app/actions/getMessages";
import { getConversationById } from "@/app/actions/getCoversationById";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

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
        <Header conversation={conversation} />

        <Body initialMessages={messages} />

        <Form />
      </div>
    </div>
  );
}
