const express = require("express");
const cors = require('cors');
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
// app.use(rateLimiter);


app.use(cors({
  origin: "http://localhost:5173", // Adjust as per your frontend URL
}));

// Routes
const userRoutes = require("./route/userRoute.js");
const productRoutes = require("./route/productRoute");
const commentRoutes = require("./route/commentRoute");
const articleRoutes = require("./route/articleRoute")
const routineRoutes = require("./route/routineRoute")

// Routes
app.use("/products", productRoutes);
// Routes
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

app.use("/api/chat", chatRoutes);
app.use("/routine", routineRoutes);
app.get("/", (req, res) => {
    res.send("Hello from the other side");
  });
app.use('/articles',articleRoutes)
  
// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});