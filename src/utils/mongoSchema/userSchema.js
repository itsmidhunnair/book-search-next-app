const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  oAuth: {
    type: Boolean,
    require: true,
    default: false,
  },
  oAuthType: {
    type: String,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);