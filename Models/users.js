import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema({
  id: Schema.ObjectId,
  name: String,
  email: {
    type: String,
    unique: true, // If email should be unique
  },
  phone: String,
  Address: String,
  profile: {
    education: String,
    age: String,
  },
});

const users = mongoose.model("users", usersSchema);

export default users;
