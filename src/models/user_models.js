import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
    trim: true,
    minLength: 3,
    maxLength: 15,
    index: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  fullName: {
    type: String,
    require: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
