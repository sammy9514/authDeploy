import { Document, Schema, model } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  avatar: string;
  verificationToken: string;
  verified: boolean;
}

interface iData extends iUser, Document {}

const userModel = new Schema<iData>(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iData>("user", userModel);
