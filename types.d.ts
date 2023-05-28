import { User, Conversation, Message } from "@prisma/client";

export type MessageProps = Message & {
  sender: User;
  seen: User[];
};

export type ConversationProps = Conversation & {
  users: User[];
  messages: MessageProps[];
};
