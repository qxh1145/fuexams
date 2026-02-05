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

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).json({ message: "Can't find" });
    }
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, displayName, role } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        displayName,
        role,
      },
      { new: true },
    );

    if (!updateUser) {
      return res.status(404).json({ message: "Cannot find task" });
    }

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error while update task", error);
    return res.status(500).json({ message: "error while update task" });
  }
};
