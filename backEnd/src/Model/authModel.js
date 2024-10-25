const mongoose = require("mongoose");
const { Schema } = mongoose;

const regSchema = new Schema({
  UserName: {
    type: "String",
    required: [true, "Full Name mus be required !!"],
    min: [3, "minum Three charecter"],
    max: [12, "Maximum 12 charecter"],
  },
  Email: {
    type: "String",
    required: [true, "Email missing or Invalid !!"],
  },
  TelePhone: {
    type: "String",
    required: [true, "TelePhone missing or Invalid !!"],
    max: [13, "max Name size 13 charecter"],
    min: [9, "Minimun Name size 9 charecter"],
  },
  Password: {
    type: String,
    required: [true, "Passsword is missing"],
    trim: true,
  },
  OTP: {
    type: String,
  },
  userIsVeryFied: {
    type: Boolean,
    default: false,
  },
  Token: {
    type: String,
  },
  avatar: {
    type: String,
  },
});
const RegModel = mongoose.model("RegisterUser", regSchema);
module.exports = { RegModel };
