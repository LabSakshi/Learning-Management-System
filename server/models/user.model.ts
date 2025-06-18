require("dotenv").config();
import jwt from "jsonwebtoken";
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { timeStamp } from "console";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface avatarType {
  public_id: string;
  url: string;
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: avatarType;
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter valid email",
      },

      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please Enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    courses: [{ courseId: String }],
  },
  { timestamps: true }
);

// Hash password before saving

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// sign access token - when user will login we will create access token and send them as cookie

userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "");
};

// sign refresh token - when user will login we will create refresh token

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "");
};

// compare password

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
