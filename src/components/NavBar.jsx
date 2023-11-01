
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
// import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import {LogoutCompo} from "../components/LogoutCompo"
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const NavBar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  // if (status === "unauthenticated") {
  //   redirect("/login");
  // }
  return (
    <div className="bg-green-900 text-white text-lg">
      <ul className="flex justify-around py-5">
        <Link href="/.">
          <li className="cursor-pointer">Dashboard</li>
        </Link>
        <Link href="/student">
          <li className="cursor-pointer">Student</li>
        </Link>
        <Link href="/lecturer">
          <li className="cursor-pointer">Lecturer</li>
        </Link>
        <Link href="/admin">
          <li className="cursor-pointer">Admin</li>
        </Link>
        <Link href="/admin/finance">
          <li className="cursor-pointer">Finance</li>
        </Link>
        <Link href="/profile">
          <li className="cursor-pointer">Profile</li>
        </Link>

        {session ? (
          <>
            {/* <li onClick={() => signOut()} className="cursor-pointer">
              Logout
            </li> */}

            <LogoutCompo/>
          </>
        ) : (
          <>
            <Link href="/login">
              <li className="cursor-pointer">Login</li>
            </Link>
            <Link href="/register">
              <li className="cursor-pointer">Register</li>
            </Link>
          </>
        )}

        {session && (
          <li className="cursor-pointer text-green-300 uppercase">
            {session?.user?.name}
          </li>
        )}
      </ul>
    </div>
  );
};
