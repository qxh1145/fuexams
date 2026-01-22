import User from "../model/Users.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-hashedPassword");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("Error while get current user");
    return res.status(500).json({ message: "error while getting user" });
  }
};
