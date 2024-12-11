require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const helmet = require("helmet");
const path = require("path");

const app = express(); // Initialize app before using it

// Middleware to serve static files (React build folder)
app.use(express.static(path.join(__dirname, "frontendBookShelf", "build")));

// Routes and other configurations below...
const verifyToken = require("./middleware/verifyToken");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const friendshipRoutes = require("./routes/friendshipRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(dbURI).then(
  () => {
    console.log("Connected to DB");
  },
  (err) => {
    console.error("Database connection error: " + err);
  }
);

// Middleware configurations
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3002",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require("./passport")(passport); // Load passport strategies

// Helmet for security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://trusted-script-source.com"],
    },
  })
);

// Public routes
app.use("/users", userRoutes);

// Protected routes
app.use("/api/books", bookRoutes);
app.use("/api/friendships", friendshipRoutes);
app.use("/api/reviews", reviewRoutes);

// Fallback route for React (serves React app for all other routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendBookShelf", "build", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!", error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});