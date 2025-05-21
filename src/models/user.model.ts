/* eslint-disable @typescript-eslint/no-explicit-any */
// models/User.ts
import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
export class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: false })
  phone!: string;

  @prop({ required: false })
  image?: string;

  @prop({ required: false })
  accessToken?: string;

  @prop({ required: false })
  refreshToken?: string;
}

const UserModel = mongoose.models.User || getModelForClass(User);

export default UserModel;
