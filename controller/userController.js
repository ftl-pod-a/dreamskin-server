// const userModel = require("../model/userModel");

// const getUserProfile = async (req, res) => {
//   try {
//     const user = await userModel.getUserById(req.user.sub); // Assuming user ID is stored in `sub` field of the payload
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const createUser = async (req, res) => {
//   const { username, skinType, goals, concerns } = req.body;
//   try {
//     const newUser = await userModel.createUser({
//       google_id: req.user.sub, // Assuming `sub` is the Google ID
//       username,
//       skinType,
//       goals,
//       concerns,
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updateUserProfile = async (req, res) => {
//   const userId = req.user.sub; // Assuming `sub` is the user ID
//   const { username, skinType, goals, concerns } = req.body;
//   try {
//     const updatedUser = await userModel.updateUser(userId, {
//       username,
//       skinType,
//       goals,
//       concerns,
//     });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const deleteUserProfile = async (req, res) => {
//   const userId = req.user.sub; // Assuming `sub` is the user ID
//   try {
//     const deletedUser = await userModel.deleteUser(userId);
//     res.status(200).json(deletedUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getUserProfile,
//   createUser,
//   updateUserProfile,
//   deleteUserProfile,
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByUsername,
  findUserById,
  updateUserById,
  deleteUserById,

} = require("../model/userModel");

const register = async (req, res) => {
    const { username, password, skinType, goals, concerns } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(username, hashedPassword, skinType, goals, concerns);
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error("User register error:", error);
      res.status(400).json({ error: "Failed to register user" });
    }
  };
  
  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await findUserByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
  
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET
        // "SECRET KEY"
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  const updateUser = async (req, res) => {
    const user_id = parseInt(req.params.user_id); // Assuming user_id is passed as a route parameter
    const { username, skinType, goals, concerns } = req.body;
  
    try {
      const updatedUser = await updateUserById(user_id, {
        username,
        skinType,
        goals,
        concerns,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(`Error updating user with id ${user_id}:`, error);
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  
  // Delete a user
  const deleteUser = async (req, res) => {
    const user_id = parseInt(req.params.user_id); // Assuming user_id is passed as a route parameter
  
    try {
      await deleteUserById(user_id);
      res.status(204).end(); // Successfully deleted, no content to return
    } catch (error) {
      console.error(`Error deleting user with id ${user_id}:`, error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
  
  module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
  };