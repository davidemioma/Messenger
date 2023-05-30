import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversation;
  } catch (err) {
    return null;
  }
};
