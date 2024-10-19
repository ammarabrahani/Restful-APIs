import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  hashpassword: { type: String },
});

// Middleware to hash password before saving user
userSchema.pre("save", async function (next) {
  if (this.isModified("hashpassword")) {
    const salt = await bcrypt.genSalt(10);
    this.hashpasswordhashpassword = await bcrypt.hash(this.hashpassword, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
