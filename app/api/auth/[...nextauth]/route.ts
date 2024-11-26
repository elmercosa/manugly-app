import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { post } from "@/services/request";

var jwt = require("jsonwebtoken");

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const userData = await post("/auth/loginCustomer", credentials);

        const secret = process.env.NEXTAUTH_SECRET || "";
        let user = null;

        try {
          user = jwt.verify(userData.accessToken, secret);
          user.accessToken = userData.accessToken;
        } catch (e) {
          return null;
        }

        return user ?? null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
