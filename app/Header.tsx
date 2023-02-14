import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function Header({ session }: Props) {
  return (
    <>
      {session ? (
        <header className="sticky top-0 z-50 bg-white flex items-center justify-between p-10 shadow-sm">
          <div className="flex space-x-2">
            <Image
              className="rounded-full mx-2 p-1 object-contain"
              height={10}
              width={50}
              /* @ts-ignore */
              src={session?.user?.image! || "https://links.papareact.com/jne"}
              alt="Profile Picture"
              style={{ height: "auto", width: "auto" }}
            />
            <div>
              <p className="text-blue-400">Logged in as:</p>
              {/* @ts-ignore */}
              <p className="font-bold text-lg">{session?.user?.name}</p>
            </div>
          </div>

          <LogoutButton />
        </header>
      ) : (
        <header className="sticky top-0 z-50 bg-white flex items-center justify-center p-10 shadow-sm">
          <div className="flex flex-col items-center space-y-5">
            <div className="flex space-x-2 items-center">
              <Image
                className=""
                src="https://links.papareact.com/jne"
                height={10}
                width={50}
                alt="logo"
              />
              <p className="text-blue-400">Welcome to Meta Messenger</p>
            </div>

            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </Link>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;

// if (session) {
//   return (
//     <header className="sticky top-0 z-50 bg-white flex items-center justify-between p-10 shadow-sm">
//       <div className="flex space-x-2">
//         <Image
//           className="rounded-full mx-2 p-1 object-contain"
//           height={10}
//           width={50}
//           src={session?.user?.image!}
//           // src="https://links.papareact.com/jne"
//           alt="Profile Picture"
//           style={{ height: "auto", width: "auto" }}
//         />
//         <div>
//           <p className="text-blue-400">Logged in as:</p>
//           <p className="font-bold text-lg">{session?.user?.name}</p>
//         </div>
//       </div>

//       <LogoutButton />
//     </header>
//   );
// } else {
//   return (
//     <header className="sticky top-0 z-50 bg-white flex items-center justify-center p-10 shadow-sm">
//       <div className="flex flex-col items-center space-y-5">
//         <div className="flex space-x-2 items-center">
//           <Image
//             className=""
//             src="https://links.papareact.com/jne"
//             height={10}
//             width={50}
//             alt="logo"
//           />
//           <p className="text-blue-400">Welcome to Meta Messenger</p>
//         </div>

//         <Link
//           href="/auth/signin"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Sign In
//         </Link>
//       </div>
//     </header>
//   );
// }
