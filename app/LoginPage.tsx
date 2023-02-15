"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-20">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile Picture"
          style={{ height: "auto", width: "auto" }}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn("facebook")}
      >
        Sign in with Facebook
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
