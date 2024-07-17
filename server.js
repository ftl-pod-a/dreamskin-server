const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const verifyToken = require("./middleware/auth");
const cors = require('cors')
const morgan = require("morgan");
require("dotenv").config();
const { rateLimiter } = require("./utils/security.js");
const chatRoutes = require("./route/chatRoute.js");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
//use rate limiter here
app.use(rateLimiter);

app.use(cors({
  origin: "http://localhost:5173", // Adjust as per your frontend URL
}));

// Use environment variables for OAuth credentials
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = "http://localhost:3000/auth/google/callback";

const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

// Routes
const userRoutes = require("./route/userRoute.js");
const productRoutes = require("./route/productRoute");
const commentRoutes = require("./route/commentRoute")

// Protected route example
app.get("/protected_route", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Google OAuth login
app.get("/auth/login", (req, res) => {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.redirect(authorizationUrl);
});

// Google OAuth callback
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const googleUser = await oauth2.userinfo.get();
    console.log(googleUser.data);
    // Process user data, check against the DB, etc.

    res.redirect(`http://localhost:5173/callback?token=${tokens.id_token}`); // Redirect to frontend callback
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication failed!");
  }
});

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
// Routes
app.use("/comments", commentRoutes);
app.use("/api/chat", chatRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});