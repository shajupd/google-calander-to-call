"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      redirect: true,
      redirectTo: "/in",
    });
  };

  return (
    <Button variant={"outline"} className="!p-6 cursor-pointer " onClick={handleGoogleSignIn}>
      <FcGoogle />
      Sign in with google
    </Button>
  );
};

export default GoogleSignInButton;
