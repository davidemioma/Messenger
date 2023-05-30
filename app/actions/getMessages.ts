import prisma from "@/lib/prismadb";

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (messages.length === 0) return [];

    return messages;
  } catch (err) {
    return null;
  }
};
