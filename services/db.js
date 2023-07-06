import mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1:27017/Users")
  .then(() => {
    console.log("Monog DB Connected");
  })
  .catch((err) => console.log("Error", err));
