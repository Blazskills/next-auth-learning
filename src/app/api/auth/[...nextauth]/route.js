import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const refreshTokenApiCall = async (token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/account/jwt/refresh/";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: token?.refreshToken,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    return {
      ...token,
      error: null,
      accessToken: data.access,
      refreshToken: data.refresh,
      expiresIn: Date.now() + 29 * 24 * 60 * 60 * 1000,
    };
  } else {
    return {
      // TODO: SignOut when userRes response is 401 so that user register again
      error: "Refresh access token error",
    };
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const role = credentials?.role;
        const url =
          role === "student"
            ? "http://localhost:8080/api/v1/account/login/student/"
            : role === "staff"
            ? "http://localhost:8080/api/v1/account/login/staff/"
            : null; // Handle other roles as needed
        // const url = "http://localhost:8080/api/v1/account/login/student/";
        if (url) {
          // try {
            const res = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                admission_number: credentials?.email,
                password: credentials?.password,
              }),
            });
            const response = await res.json();
            if (res.ok) {
              return response;
            } else {
              
              // console.log(response);
              throw new Error(response?.message)
              // return null;

            }
          // } catch (error) {
          //   console.error("Error during authentication:", error);
          //   // return null;
          //   throw new Error("Error during authentication")
          // }
        } else {
          console.error("Invalid role:", role);
          // return null;
          throw new Error("Invalid role")

        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.token?.access;
        token.refreshToken = user?.token?.refresh;
        token.ut = user?.ut;
        token.expiresIn = Date.now() + 29 * 24 * 60 * 60 * 1000;
      }
      // console.log(token?.expiresIn);
      // console.log(Date.now() < token?.expiresIn);
      if (Date.now() < token?.expiresIn) {
        return token;
      }
      return await refreshTokenApiCall(token);
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken;

      if (session?.accessToken ?? false) {
        const url =
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/account/profile/";
        const userRes = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        });
        // TODO: SignOut when userRes response is 401 so that user register again

        if (userRes.ok) {
          const userDetails = await userRes.json();
          session.user = userDetails?.data;
          session.user.name = `${userDetails?.data?.user?.first_name} ${userDetails?.data?.user?.last_name}`;
          return session;
        }
      }
      token.expiresIn = Date.now();
      return null;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
