import { getUserByEmail } from "@/actions/actions.server";
import { auth } from "@/auth/options";
import EditPhoneNumber from "@/components/EditPhoneNumber/Index";
import LogoutButton from "@/components/LogoutButton/Index";
import SetupPhoneNumberDialog from "@/components/SetupPhoneNumberDialog/Index";
import React from "react";

const page = async () => {
  const session = await auth();
  let userDetails = null;
  if (session?.user?.email) {
    userDetails = await getUserByEmail(session.user.email);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {userDetails && userDetails?.phone ? (
        <div className="flex flex-col gap-4 items-center">
          <EditPhoneNumber userDetails={userDetails} />
          <LogoutButton />
        </div>
      ) : (
        <div>
          <SetupPhoneNumberDialog />
        </div>
      )}
    </div>
  );
};

export default page;
