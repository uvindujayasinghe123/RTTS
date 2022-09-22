const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const constants = require("../shared/const");
const { createEmailVerificationToken } = require("../shared/AuthTokensHelper");

const schemaOptions = { timestamps: true };

const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

UserSchema.methods.isEmailVerified = async function (emailVerificationToken) {
  try {
    return emailVerificationToken === this.emailVerificationToken;
  } catch (err) {
    throw err;
  }
};

UserSchema.methods.isPasswordResetTokenVerified = async function (
  passwordResetToken
) {
  try {
    return passwordResetToken === this.passwordResetToken;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", UserSchema);
