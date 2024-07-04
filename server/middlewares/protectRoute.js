import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log(req.body.jwt)
    const token = req.cookies.jwt || req.query.jwt;
    console.log(req.body.jwt, "from body")
    console.log(req.query.jwt)
    const secretKey = process.env.JWT_SECRET;
    console.log(token, "token from protect");
    if (!token)
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    const decoded = jwt.verify(token, secretKey);
    if (!decoded)
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    const user = await User.findById(decoded.userID);
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message, "from protect route");
    res.status(500).json({ error: error.message });
  }
};
