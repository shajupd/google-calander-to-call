import { connectDB } from "@/lib/mongodb";
import { TwilioService } from "@/lib/twilio.service";
import UserModel from "@/models/user.model";
import { GoogleCalendarUtils } from "@/utils.ts/google-calendar.utils";

export async function GET() {
  // This is a placeholder for the actual sync logic
  // You can implement your sync logic here

  await connectDB();
  const users = await UserModel.find();
  const usersWithPhoneNumbers = users.filter((user) => user.phone);

  if (usersWithPhoneNumbers.length > 0) {
    Promise.all(
      usersWithPhoneNumbers.map(async (user) => {
        const phoneNumber = user.phone;
        const email = user.email;
        const accessToken = user.accessToken;
        const refreshToken = user.refreshToken;

        const events = await GoogleCalendarUtils.getEvents(accessToken, refreshToken);
        if (events?.length) {
          console.log(`Syncing phone number ${phoneNumber} for user ${email}`);
          await TwilioService.createCall(phoneNumber);
        }
        // Assuming you have a function to sync the phone number
        // await syncPhoneNumber(email, phoneNumber);
      })
    );
  } else {
    console.log("No users with phone numbers found");
  }

  return new Response("Sync initiated", { status: 200 });
}
