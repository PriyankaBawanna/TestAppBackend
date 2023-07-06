import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  mobile: { type: String, required: false },
  password: { type: String, required: false },
});

const User = mongoose.model("user", userSchema);
export default User;
