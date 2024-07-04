import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  return token;
};

export default generateTokenAndSetCookie;
