"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Lecturer = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to the login page if not authenticated
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    // You might want to show a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session ? <div>Only Lecturer Staff</div> : null}
    </div>
  );
};

export default Lecturer;
