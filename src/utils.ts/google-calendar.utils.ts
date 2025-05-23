import { google } from "googleapis";
export class GoogleCalendarUtils {
  static getEvents = async (accessToken: string, refreshToken: string) => {
    const clientId = process.env.AUTH_GOOGLE_ID;
    const clientSecret = process.env.AUTH_GOOGLE_SECRET;
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    // Get current time and 5 minutes from now
    const now = new Date();
    const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

    try {
      const res = await calendar.events.list({
        calendarId: "primary",
        timeMin: now.toISOString(),
        timeMax: fiveMinutesLater.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 50, // max 2500 by Google API
      });

      const events = res.data.items || [];

      // Filter events that are starting in the next 5 minutes
      const nextFiveMinutesEvents = events.filter((event) => {
        if (!event.start?.dateTime) {
          return false; // Skip events without a start dateTime
        }
        const eventStart = new Date(event?.start?.dateTime);
        return eventStart >= now && eventStart <= fiveMinutesLater;
      });

      return nextFiveMinutesEvents.map((event) => ({
        id: event.id,
        summary: event.summary,
        start: event.start,
        end: event.end,
        description: event.description,
        location: event.location,
      }));
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      throw error;
    }
  };
}
