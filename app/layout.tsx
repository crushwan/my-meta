import "../styles/globals.css";
import Header from "./Header";
import { SessionProvider } from "./SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import LoginPage from "./LoginPage";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <LoginPage />
          ) : (
            <>
              <Header session={session} />
              {children}
            </>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
