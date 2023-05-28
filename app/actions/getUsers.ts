import prisma from "@/lib/prismadb";
import { getSession } from "./getSession";

export const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return [];

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session?.user?.email,
        },
      },
    });

    if (users.length === 0) return [];

    return users;
  } catch (err) {
    return [];
  }
};
