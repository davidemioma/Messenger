import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

interface Params {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { conversationId } = params;

    //Check if converstaion exists
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    //Get the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation);

    //Adding the current user to message seen list.
    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (updatedMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
