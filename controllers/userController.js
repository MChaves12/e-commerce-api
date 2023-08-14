const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomErrors = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find({role: 'user'}).select('-password');
  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({_id: req.params.id}).select('-password');
  if(!user){
    throw new CustomErrors.NotFoundError(`No user with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({user: req.user});
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if(!oldPassword || !newPassword) {
    throw new CustomErrors.BadRequestError('Please provide both values');
  };

  const user = await User.findOne({_id: req.user.userId});
  console.log(user)
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if(!isPasswordCorrect) {
    throw new CustomErrors.UnauthenticatedError('Invalid credentials');
  };

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({msg: 'Password updated'});
};

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updatePassword,
}
