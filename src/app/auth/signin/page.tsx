import { authOptions } from "../../api/auth/[...nextauth]/route";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";

import GoogleSignInWrapper from "@/components/GoogleSignInWrapper"

export default function SignIn() {
  return (
    <>
      <div>
        <h1>Sign In</h1>
      </div>
      <GoogleSignInWrapper />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  console.log("Providers:" + providers);

  return {
    props: { providers },
  };
}
