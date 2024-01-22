import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import EmailProvider from "next-auth/providers/email";
// import InstagramProvider from "next-auth/providers/instagram";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // })
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    // InstagramProvider({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    // })
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.profilePic = (user as User)?.profilePic || '';
      session.user.username = (user as User)?.username || '';
      return session;
    },
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#de5617", // Hex color code
    logo: "https://res.cloudinary.com/dlvmcylti/image/upload/v1705878970/LogoOrange_d2tr0a.svg", // Absolute URL to image
    buttonText: "#de5617", // Hex color code
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: '/signout',
    error: "/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/manage/edit", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
