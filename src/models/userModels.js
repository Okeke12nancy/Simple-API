const mongoose = require("mongoose");

// This model is for user schema
const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please provide last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
      select: false,
    },
    phone_number: {
      type: String,
      required: [true, "Please provide phone number"],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please provide role"],
      enum: ["admin", "user"],
      lowercase: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

module.exports = mongoose.model("User", UserSchema);
