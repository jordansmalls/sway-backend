import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import { throwError } from "../utils/errorUtility"
import User, { IUser } from '../models/userModel';
import generateToken from '../utils/generateToken';


// @desc    Auth user & get token (email)
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id.toString());

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    throwError(401, "Invalid email or password.");
  }
});

// @desc    Auth user & get token (username)
// @route   POST /api/users/login/username
// @access  Public

const authUserUsername = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: IUser | null = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id.toString());

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    throwError(401, "Invalid username or password.");
  }
});


// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  console.log('registerUser: User exists check', userExists);

  if (userExists) {
    throwError(400, "User already exists.");
  };

  const user = await User.create({
    name,
    email,
    password,
  });
  console.log('registerUser: User created', user);

  if (user) {
    generateToken(res, user._id.toString());

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    throwError(400, "Invalid user data.");
  }
});

// @desc    Update/Create Username
// @route   PUT /api/users/profile/username
// @access  Private
const updateUsername = asyncHandler(async (req: Request, res: Response) => {
  console.log('updateUsername: Request received', req.body);
  if (!req.user) {
    throwError(401, 'Not authorized.');
    return;
  }

  const user: IUser | null = await User.findById(req.user._id.toString());
  console.log('updateUsername: User found', user);
  if (!user) {
    throwError(404, 'User not found.');
    return;
  }


  if (!req.body.username) {
    throwError(400, 'Please provide a username.');
    return;
  }

  // check if the username is already taken by another user
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
    throwError(400, 'Username is already taken.');
  }

  user.username = req.body.username;
  await user.save();
  res.json({ username: user.username });
});



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {

  if(!req.user) {
    throwError(401, "Not authorized.");
    return;
  };

  const user: IUser | null = await User.findById(req.user._id.toString());
  // const user = await User.findById((req.user as IUser)._id.toString());


  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // hashing is done elsewhere.
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    throwError(404, "User not found.");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully.' });
};


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  console.log('getUserProfile: Request received');
  console.log('getUserProfile: req.user:', req.user); // Log req.user
  if(!req.user) {
    throwError(401, "Not authorized.");
    return;
  }

  const user = await User.findById(req.user._id.toString());
  // const user = await User.findById((req.user as IUser)._id.toString());
  console.log('getUserProfile: User found:', user); // Log the user

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
     console.log('getUserProfile: Response sent');
  } else {
    throwError(404, "User not found.");
  }
});


export {
  authUser,
  authUserUsername,
  registerUser,
  updateUsername,
  updateUserProfile,
  logoutUser,
  getUserProfile
}