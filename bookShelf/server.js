require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const helmet= require("helmet");
const path = require("path");

//serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build")));
// const expressJwt = require('jsonwebtoken');

//const protectedRoute = expressJwt({ secret: 'your_jwt_secret', algorithms: ['HS256'] });
// Usage example
// app.get('/protected', protectedRoute, (req, res) => {
//     res.send('This is a protected route');
// });



const verifyToken = require("./middleware/verifyToken");
//const verifyToken = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require('./routes/bookRoutes');
const friendshipRoutes = require("./routes/friendshipRoutes");
const reviewRoutes = require("./routes/reviewRoutes");



const app = express();
const PORT =  process.env.PORT || 3000;
const dbURI= process.env.MONGO_URI;



mongoose.connect(dbURI).then(()=>{
    console.log("connected to db")
},(err)=>{
    console.log("something Occured error"+err);
})

// CORS configuration
// const corsOptions = {
//     origin: 'http://localhost:3002',  // Your frontend's URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
//     //allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers (including token headers)
//     credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
// };

// app.use(cors(corsOptions)); 

// app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3002"  ,
    credentials: true,
  })
);
 //app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], // Only allow resources from the same origin
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'",'https://trusted-script-source.com'], // Adjust as necessary
        // Add other directives as needed
    },
}));

app.use(passport.initialize());
//loading passport starategies by passing passport instatnce
require("./passport")(passport);
//public routes
app.use('/users',userRoutes);



app.use('/api',verifyToken);

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


  // Fallback route for React (handles all frontend routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontendBookShelf","build", "index.html"));
  });

app.listen(PORT,(req,res)=>{
    console.log(`server on ${PORT}`)
});
