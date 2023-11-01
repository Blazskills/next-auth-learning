"use client"

import React from "react";
import { signOut } from "next-auth/react";

export const LogoutCompo = () => {
  return (
    <div>
      {" "}
      <li onClick={() => signOut()} className="cursor-pointer">
        Logout
      </li>
    </div>
  );
};
