import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Student = async () => {
  // TODO: SERVER SIDE ROUTE
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/student");
  }
  // if (session && !session.user) {
  //   redirect("/login?callbackUrl=/student");
  // }
  return (
    <div>
      Server side route only Student
      <p>{session?.user?.name}</p>
      <p>{session?.user?.about_me}</p>
      <p>{session?.user?.department}</p>
      <p>{session?.user?.faculty}</p>
      <p>{session?.user?.user?.permission}</p>
      <p>{session?.user?.user?.user_type}</p>
      <div>
        {session?.user?.is_cleared_financially ? (
          <div className="text-green-500">School Fees Cleared</div>
        ) : (
          <div className="text-red-500">School Fees Owning</div>
        )}
      </div>
    </div>
  );
};

export default Student;
