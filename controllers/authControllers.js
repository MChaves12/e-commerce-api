const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const { attachCookiesToResponse } = require('../utils/index');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  const tokenUser = { userId: user._id, name: user.name, role: user.role };
  attachCookiesToResponse({res, user: tokenUser})
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new CustomError.BadRequestError('Please provide email or password');
  }

  const user = await User.findOne({ email });

  if(!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const checkPassword = await user.comparePassword(password);

  if(!checkPassword) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const tokenUser = { user: user.name, userId: user._id, name: user.name };
  attachCookiesToResponse({res, user: tokenUser})
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  res.status(StatusCodes.OK).json({msg: 'user logged out!'})
};

module.exports = {
  register,
  login,
  logout,
};
