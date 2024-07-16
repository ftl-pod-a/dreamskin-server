const userModel = require("../model/userModel");

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.sub); // Assuming user ID is stored in `sub` field of the payload
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, skinType, goals, concerns } = req.body;
  try {
    const newUser = await userModel.createUser({
      google_id: req.user.sub, // Assuming `sub` is the Google ID
      username,
      skinType,
      goals,
      concerns,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.sub; // Assuming `sub` is the user ID
  const { username, skinType, goals, concerns } = req.body;
  try {
    const updatedUser = await userModel.updateUser(userId, {
      username,
      skinType,
      goals,
      concerns,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserProfile = async (req, res) => {
  const userId = req.user.sub; // Assuming `sub` is the user ID
  try {
    const deletedUser = await userModel.deleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserProfile,
  createUser,
  updateUserProfile,
  deleteUserProfile,
};