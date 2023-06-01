import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

interface Params {
  conversationId: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
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

    await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    conversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:remove", conversation);
      }
    });

    return NextResponse.json("Conversation deleted");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
