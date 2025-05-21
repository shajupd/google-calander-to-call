"use client";
import React from "react";
import { Button } from "../ui/button";
import appApi from "@/lib/axios.instance";

const SyncButton = () => {
  const initiateSync = async () => {
    await appApi.get("/sync");
  };

  return <Button onClick={initiateSync}>Sync</Button>;
};

export default SyncButton;
