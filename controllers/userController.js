const getAllUsers = async (req, res) => {
  res.send("get all users");
};

const getSingleUser = async (req, res) => {
  res.send("get single user");
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updatePassword = async (req, res) => {
  res.send("update password");
};

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updatePassword,
}
