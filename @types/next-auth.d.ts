import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      profilePic: string;
      username: string;
    } & DefaultSession["user"];
  }
}
