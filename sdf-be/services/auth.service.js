const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.register = async (username, email, password) => {
  // Check if email already exists
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    const err = new Error("Email already exists");
    err.code = "EMAIL_EXISTS";
    throw err;
  }

  // Hash the password
  const password_hash = await bcrypt.hash(password, 10);

  // Insert into DB
  const user = await userModel.createUser(username, email, password_hash);
  return user;
};

exports.login = async (email, password) => {
  const user = await userModel.findByEmail(email);

  if (!user) {
    const err = new Error("Invalid credentials");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  return user;
};
