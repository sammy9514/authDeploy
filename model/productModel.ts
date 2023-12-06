import { Document, Schema, Types, model } from "mongoose";

interface iUser {
  title: string;
  description: string;
  price: number;
  image: string;
  rate: number;
  ratings: Array<{}>;
  review: Array<{}>;
  like: Array<string>;
}

interface iData extends iUser, Document {}

const productModel = new Schema<iData>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    rate: {
      type: Number,
    },
    ratings: [
      {
        type: Types.ObjectId,
        ref: "ratings",
      },
    ],
    review: [
      {
        type: Types.ObjectId,
        ref: "review",
      },
    ],
    like: { type: [] },
  },
  {
    timestamps: true,
  }
);

export default model<iData>("product", productModel);
