import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/lib/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) return res.status(401).end();

    const socketId = req.body.socket_id;

    const channel = req.body.channel_name;

    const data = {
      user_id: session?.user?.email,
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return res.send(authResponse);
  } catch (err) {
    console.error("Error occurred:", err);

    return res.status(500).json({ error: "Internal server error" });
  }
}
