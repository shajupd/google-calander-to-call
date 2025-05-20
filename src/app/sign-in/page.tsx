import GoogleSignInButton from "@/components/GoogleSignInButton/Index";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
      <GoogleSignInButton />
    </div>
  );
};

export default page;
