import { authOptions } from "../../api/auth/[...nextauth]/route";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";

import GoogleSignInWrapper from "@/components/GoogleSignInWrapper";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/discover");
  }

  return (
    <>
      <div className="mx-auto mt-24 max-w-[512px] rounded-lg border-2 border-stone-700 bg-stone-900 px-6 pt-4 md:mt-0">
        {/* <h1 className="text-center w-full mb-4 text-xl font-medium text-stone-400">Upload New Byte</h1> */}
        <div>
          <div className="flex flex-col pb-4 xs:grid xs:grid-cols-8">
            <div className="col-span-3 px-2 pb-4 xs:pb-0 ">
              <div className="grid h-full content-center">
                <h1 className="text-center text-3xl font-light">Sign In</h1>
              </div>
            </div>
            <div className="col-span-5 px-2">
              <input
                name="email"
                placeholder="Email [TEMP]"
                className="input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
              />
              <div>
                <GoogleSignInWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
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
