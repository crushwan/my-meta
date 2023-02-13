"use client";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import { getServerSession } from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      /* @ts-ignore */
      username: session?.user?.name!,
      /* @ts-ignore */
      profilePic: session?.user?.image!,
      /* @ts-ignore */
      email: session?.user?.email!,
      // email: "kjasdkasks@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex py-5 px-10 space-x-2 border-t border-gray-100 bg-white"
    >
      <input
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2
        focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        type="text"
        placeholder="Enter message here..."
      />
      <button
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
      py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
