import { Schema, model, Document } from "mongoose";

export interface userInterface extends Document {
  email: string;
  password: string;
  hero: number;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hero: {
    type: Number,
    required: true,
  },
});

export default model<userInterface>("User", userSchema);
