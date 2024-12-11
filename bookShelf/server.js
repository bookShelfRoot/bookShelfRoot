require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const helmet = require("helmet");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("connected to db")
  }, (err) => {
    console.log("something Occured error" + err);
  })

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3002",
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '(link unavailable)'],
  }
}));

app.use(passport.initialize());

require("./passport")(passport);

app.use('/users', require("./routes/userRoutes"));
app.use('/api', require("./routes/verifyToken"));
app.use('/api/books', require("./routes/bookRoutes"));
app.use('/api/friendships', require("./routes/friendshipRoutes"));
app.use('/api/reviews', require("./routes/reviewRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontendBookShelf", "build", "index.html"));
});

app.listen(PORT, (req, res) => {
  console.log(`server on ${PORT}`)
});