import { useSession } from "next-auth/react";
import Image from "next/image";
import { Message } from "../typings";
import TimeAgo from "react-timeago";
import { useEffect, useRef } from "react";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={40}
          src={message.profilePic}
          alt="Profile Picture"
          style={{ height: "auto", width: "auto" }}
          priority
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo date={new Date(message.created_at)} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
