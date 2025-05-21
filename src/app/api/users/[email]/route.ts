import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: { params: Promise<{ email: string }> }) {
  const { email } = await context.params;
  const body = await req.json();
  console.log("🚀 ~ PUT ~ body:", body);
  await connectDB();

  const findLead = await UserModel.findOne({ email });
  if (!findLead) {
    return NextResponse.json({ message: "User not found" });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    findLead._id,
    {
      $set: body,
    },
    { new: true }
  );

  return NextResponse.json({
    message: "User updated successfully",
    data: updatedUser,
  });
}
