import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInterface extends Document {
  email: string;
  password: string;
  hero: object | undefined;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hero: {
    type: Object,
    required: true,
  },
});

//Encrypt password
userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

//Validate password
userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<UserInterface>("User", userSchema);
