/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // Keep your URI in .env

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables");
}

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to Mongo DB");
    mongoose.set("toObject", { virtuals: true });
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "webcastle-mt", // optional
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
