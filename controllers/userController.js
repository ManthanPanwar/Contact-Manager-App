const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  // check if user is avilable or not
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // now we will create new user
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword: ", hashedPassword);

  // create new user
  const user = await User.create({ username, email, password: hashedPassword });
  console.log("user created ", user);

  // we dont want to send the complete user information i.e, we dont want to send the password.
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not Valid");
  }
  res.json({ message: "Register the user" });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // check whether the user is present or not
  const user = await User.findOne({ email });
  // compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    // provide access token in the response
    const accessToken = jwt.sign(
      {
        //payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      // provide an access token secret(defined in .env file)
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "17m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  // res.json({ message: "login user" });
});

// @desc Current user information
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res, next) => {
  // res.json({ message: "Current user information" });
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
