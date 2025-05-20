"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const GoogleSignInButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    router.push("/in");
  };

  return (
    <Button variant={"outline"} className="!p-6 cursor-pointer " onClick={handleGoogleSignIn}>
      <FcGoogle />
      Sign in with google
    </Button>
  );
};

export default GoogleSignInButton;
