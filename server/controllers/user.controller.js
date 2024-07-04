import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  const userId = req.user._id;
  try {
    console.log("started in user controller");
    const users = await User.find({
      _id: { $ne: userId },
    }).select("-password");
    res.send(users);
  } catch (error) {
    console.log("Error: ", error.message, "from user controller");
    return res.status(500).json("Server Error");
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { data } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error(error.message); // Use console.error for errors
    res.status(500).send({ error: "Error updating user" }); // Send error response
  }
};
