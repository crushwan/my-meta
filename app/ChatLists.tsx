// "use client";
// import { useEffect } from "react";
// import useSWR from "swr";
// import { clientPusher } from "../pusher";
// import { Message } from "../typings";
// import fetcher from "../utils/fetchMessages";
// import ChatList from "./ChatList";

// type Props = {
//   initialMessages: Message[];
// };

// function ChatLists({ initialMessages }: Props) {
//   const {
//     data: messages,
//     error,
//     mutate,
//   } = useSWR<Message[]>("/api/getMessages", fetcher);

//   useEffect(() => {
//     const channel = clientPusher.subscribe("messages");

//     channel.bind("new-message", async (data: Message) => {
//       if (messages?.find((message) => message.id === data.id)) return;

//       if (!messages) {
//         mutate(fetcher);
//       } else {
//         mutate(fetcher, {
//           optimisticData: [data, ...messages!],
//           rollbackOnError: true,
//         });
//       }
//     });

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [messages, mutate, clientPusher]);

//   return (
//     <div className="flex flex-col min-w-[300px] bg-red-300 h-screen space-y-4">
//       {(messages || initialMessages).map((message) => (
//         <ChatList key={message.id} message={message} />
//       ))}
//     </div>
//   );
// }

// export default ChatLists;
