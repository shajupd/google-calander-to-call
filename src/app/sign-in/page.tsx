import { auth } from "@/auth/options";
import GoogleSignInButton from "@/components/GoogleSignInButton/Index";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/in");
  }
  return (
    <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
      <GoogleSignInButton />
    </div>
  );
};

export default page;
