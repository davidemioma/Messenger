import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { userId, name, isGroup, members } = body;

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    if (isGroup) {
      const newGroup = await prisma.conversation.create({
        data: {
          isGroup,
          name,
          users: {
            connect: [
              ...members.map((member: any) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newGroup);
    }

    const existingConverstions = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const conversation = existingConverstions[0];

    if (conversation) return NextResponse.json(conversation);

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
