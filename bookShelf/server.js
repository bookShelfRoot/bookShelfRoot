require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const helmet = require("helmet");
const path = require("path");

const verifyToken = require("./middleware/verifyToken");
//const verifyToken = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require('./routes/bookRoutes');
const friendshipRoutes = require("./routes/friendshipRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

//https://67593366bbdd001ea9856b3d--bookshelflanding.netlify.app/
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
app.use('/api',verifyToken);
//public routes
app.use('/users',userRoutes);
//app.use('/api/books', passport.authenticate('jwt', { session: false }), bookRoutes);
//protected routes
// app.use('/api/books',verifyToken,bookRoutes);
// app.use('/api/friendships', verifyToken, friendshipRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontendBookShelf/build', 'index.html'));
  });

app.listen(PORT, (req, res) => {
  console.log(`server on ${PORT}`)
});