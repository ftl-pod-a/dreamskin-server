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
} = require("../model/userModel");

// REgister User
// const register = async (req, res) => {
//   const { username, password } = req.body;
//   //   console.log("username", username, "password", password);
//   try {
//     // hash the password using bcrypt and salt factor 10
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // user model to be saved using the hashedpassword
//     const user = await createUser(username, hashedPassword);
//     res.status(201).json(user);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ error: "User register error, maybe the user exists" });
//   }
// };

// // Login User
// // user exists?
// // password correct?
// const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await findUserByUsername(username);
//   if (user && (await bcrypt.compare(password, user.password))) {
//     // create a json web token
//     const token = jwt.sign(
//       { userId: user.user_id, userName: user.username }, //as a token encode info and respond to the client
//       "SECRET KEY" //setup env variable for secret key
//     );
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ error: "Invalid Credentials" });
//   }
// };

// //export:
// module.exports = { register, login };

const register = async (req, res) => {
    const { username, password, skinType, goals, concerns } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(username, hashedPassword, skinType, goals, concerns);
      res.status(201).json(user);
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
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = { register, login };