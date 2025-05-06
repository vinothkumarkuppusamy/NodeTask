import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    role: 'admin' | 'user',
    password: string;   
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);