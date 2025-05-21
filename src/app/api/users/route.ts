import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const userProfile = await req.json();
  console.log("🚀 ~ POST ~ userProfile:", userProfile);

  const checkUser = await UserModel.findOne({ email: userProfile.email });
  if (checkUser) {
    return NextResponse.json(checkUser);
  }

  const newUser = await UserModel.create(userProfile);

  return NextResponse.json(newUser);
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  console.log("🚀 ~ GET ~ email:", email);

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" });
  }

  return NextResponse.json(user);
}
