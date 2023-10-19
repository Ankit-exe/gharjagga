const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
