const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["author", "reader"],
      required: true,
    },

    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppBooks", // Reference to the Book model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("AppUsers", userSchema);

module.exports = User;
