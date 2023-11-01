"use client";

import { redirect } from "next/navigation";
import { NavBar } from "../../../components/NavBar";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="bg-slate-100 h-screen w-screen">
      Client Home Page
      <div>
        <p>{session?.user?.name}</p>
        <p>{session?.user?.about_me}</p>
        <p>{session?.user?.department}</p>
        <p>{session?.user?.faculty}</p>
        <p>{session?.user?.user?.permission}</p>
        <p>{session?.user?.user?.user_type}</p>
        <div>
          {session?.user?.is_cleared_financially ? (
            <div className="text-green-500">School Fees Cleared</div>
          ) : session?.user?.is_cleared_financially ? (
            <div className="text-red-500">School Fees Owning</div>
          ): null}
        </div>
      </div>
    </main>
  );
}
