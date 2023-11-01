// "use client";
// import { Inter } from "next/font/google";
// import "../globals.css";
// import { NavBar } from "../../components/NavBar";
// import { redirect, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// const inter = Inter({ subsets: ["latin"] });
// export default function RootLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   console.log(session?.user?.name);
//   console.log(
//     status === "authenticated" ? "authenticated" : "not authenticated"
//   );
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       // Redirect to the login page if not authenticated
//       router.push("/login");
//     }
//   }, [status, router]);
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <NavBar />
//         {children}
//       </body>
//     </html>
//   );
// }

// "use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { NavBar } from "../../components/NavBar";
import { redirect, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({ children, req }) {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
