import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req, res) {
    // console.log(req)
    if (req.nextUrl.pathname.startsWith("/admin") && !req?.nextauth?.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/lecturer") &&
      req.nextauth?.token?.ut != "Student" &&
      req.nextauth?.token?.ut != "Admin"
    ) {
      return NextResponse.rewrite(
        new URL("/?message=You Are Not Authorized Staff or Admin Only", req.url)
      );
    }
  },

  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/lecturer/:path*", "/admin/:path*"],
};
