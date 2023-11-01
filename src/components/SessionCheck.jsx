import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default function withMyAuth(Component) {
  return async function withMyAuth(props) {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }
    return <Component {...props} />;
  };
}
