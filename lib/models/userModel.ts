import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const User = new Schema({
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
