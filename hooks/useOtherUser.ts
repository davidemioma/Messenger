import { useMemo } from "react";
import { ConversationProps } from "@/types";
import { useSession } from "next-auth/react";

const useOtherUser = (conversation: ConversationProps) => {
  const { data: session } = useSession();

  const otherUser = useMemo(
    () =>
      conversation.users.filter((user) => user.email !== session?.user?.email),
    [session?.user?.email, conversation.users]
  );

  return otherUser[0];
};

export default useOtherUser;
