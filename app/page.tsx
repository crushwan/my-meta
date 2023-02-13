import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { getServerSession } from "next-auth";
import ChatLists from "./ChatLists";

async function HomePage() {
  const session = await getServerSession();

  const data = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;

  return (
    <main className="">
      <MessageList initialMessages={messages} />
      <ChatInput session={session} />
    </main>
  );
}

export default HomePage;
