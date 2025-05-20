import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const EditPhoneNumber = () => {
  return (
    <Alert className="bg-green-200 border-0 w-96">
      <AlertTitle className="text-xl">Hai, Shaju PD 👋 </AlertTitle>
      <AlertDescription>
        <span>
          Your cron job from email <b>shajupd@webdura.tech</b> to <b>+91 9074810177</b> is active.
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default EditPhoneNumber;
