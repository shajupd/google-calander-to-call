import EditPhoneNumber from "@/components/EditPhoneNumber/Index";
import SetupPhoneNumberDialog from "@/components/SetupPhoneNumberDialog/Index";

import React from "react";

const page = () => {
  const haveActiveCron = true; // Replace with actual logic to check if a cron job is active
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {haveActiveCron ? (
        <EditPhoneNumber />
      ) : (
        <div>
          <SetupPhoneNumberDialog />
        </div>
      )}
    </div>
  );
};

export default page;
