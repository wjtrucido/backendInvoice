import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface User extends Document {
  name: string,
  email: string,
  pass: string,
  active: string,
  rol: string
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
  },
  pass: {
    type: String,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("pass")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
  } catch (error) {
    console.error(error);
    throw new Error("Fail password");
  }
});

export const user = mongoose.model("User", userSchema);