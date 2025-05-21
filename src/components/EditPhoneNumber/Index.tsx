import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { User } from "@/models/user.model";
import Image from "next/image";

interface EditPhoneNumberProps {
  userDetails?: User;
}

const EditPhoneNumber = ({ userDetails }: EditPhoneNumberProps) => {
  return (
    <Alert className="bg-green-200 border-green-600 w-96 p-5 gap-2 ">
      <AlertTitle className="text-xl flex flex-row items-center gap-2">
        <Image src={userDetails?.image as string} alt="user-avt" className="rounded-full" width={30} height={30} />
        <span>Hai, {userDetails?.name} 👋</span>
      </AlertTitle>
      <AlertDescription>
        <span>
          Your cron job from email <b>{userDetails?.email}</b> to <b>{userDetails?.phone}</b> is active.
        </span>
        <span className="mt-2 text-xs text-green-600">You will receive a call every 5 minutes, if you have any events in your calendar.</span>
      </AlertDescription>
    </Alert>
  );
};

export default EditPhoneNumber;
