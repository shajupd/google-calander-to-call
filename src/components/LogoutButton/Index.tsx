"use client";

import { LogOutIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/sign-in",
    });
  };

  return (
    <Button variant={"destructive"} className="w-full" onClick={handleLogout}>
      <LogOutIcon />
      Logout
    </Button>
  );
};

export default LogoutButton;
