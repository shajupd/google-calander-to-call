import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export class TwilioService {
  static async createCall(phoneNumber: string) {
    const call = await client.calls.create({
      from: process.env.TWILIO_PHONE_NUMBER as string,
      to: phoneNumber,
      url: "http://demo.twilio.com/docs/voice.xml",
    });

    console.log(call.sid);
  }
}
