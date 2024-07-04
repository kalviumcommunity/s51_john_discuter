import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/jwt.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const user_name = await User.findOne({ username });
    if (password !== confirmPassword)
      return res.status(400).json("Passwords don't match");
    if (user_name) return res.status(400).json("Username already exists");
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePic = `https://avatar.iran.liara.run/public/${gender}/?username=${username}`;
    console.log(profilePic);
    const user = await User.create({
      username,
      fullName,
      password: hashedPassword,
      gender,
      profilePic,
    });

    const token = generateTokenAndSetCookie(user.id, res);

    return res.status(201).json({
      _id: user._id,
      fullName,
      username,
      profilePic,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const pass = await bcrypt.compare(password, user?.password || "");
    if (!user || !pass) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      message: "Logged in successfully",
      username: user.username,
      profilePic: user.profilePic,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Successfully logged out!",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
}