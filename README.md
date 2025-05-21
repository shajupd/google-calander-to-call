````markdown
# Webcastle-MT

A modern Next.js application with Google authentication, phone number management, Google Calendar integration, Twilio calling, and MongoDB storage.

## Features

- **Google Authentication**: Secure sign-in with Google using NextAuth.js.
- **Phone Number Management**: Users can set up their phone number.
- **Google Calendar Sync**: Fetches upcoming events from the user's Google Calendar.
- **Twilio Integration**: Initiates calls to users using Twilio API in every 5 minute for upcoming events.
- **MongoDB Database**: Stores user profiles and phone numbers securely.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd webcastle-mt
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   AUTH_SECRET=your_nextauth_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```
4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `src/app` - Next.js app directory (routes, pages, API endpoints)
- `src/components` - Reusable UI and logic components
- `src/lib` - Database, Twilio, and Axios utilities
- `src/models` - Mongoose models
- `src/utils.ts` - Google Calendar utilities
````
