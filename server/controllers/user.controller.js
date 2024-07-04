import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("started in user controller");
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.send(users);
  } catch (error) {
    console.error("Error: ", error.message, "from user controller");
    res.status(500).json({
      message: "Error while getting users: " + error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { data } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Error: ", error.message, "from user controller");
    res.status(500).send({
      message: "Error updating user: " + error.message
    });
  }
};
