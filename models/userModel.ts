import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  username?: string;
  email: string;
  password: string;
  hasActiveRoom: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: [true, "A name is required."],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      minLength: [3, "Your username must be at least 3 characters long."],
      validate: {
        validator: (value: string) => !value || /^[a-zA-Z0-9]+$/.test(value),
        message: "Your username can only contain letters and numbers."
      },
    },
    email: {
      type: String,
      required: [true, "An email is required."],
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A password is required."],
      minLength: [8, "Your password must be at least 8 characters long."],
    },
    hasActiveRoom: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// indexes
userSchema.index({ username: 1, email: 1 });


userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model<IUser>("User", userSchema);
export default User;


