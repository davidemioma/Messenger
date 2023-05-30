import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { name, email, image } = body;

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        email,
        image,
      },
    });

    return NextResponse.json("User updated!");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
