import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_API_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_API_KEY!,
  {
    cluster: "eu",
  }
);
