const User = require("../db/userModel");

const getUserByEmail = (request, response) => {
  const { email } = request.params;
  // Find the user by ID
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "User not found",
        });
      }
      // User found, send the user data
      response.status(200).send({
        message: "User retrieved successfully",
        user,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error retrieving user",

        error,
      });
    });
};

const updateProfile = async (req, res) => {
  const { firstname, lastname, email, address } = req.body;
  const useremail = req.body.email;
  const updatedUser = await User.findOneAndUpdate(
    { email: useremail },
    { firstname, lastname, address, email },
    { new: true }
  );
  res.json({ success: true, user: updatedUser });
};

module.exports = {
  getUserByEmail,
  updateProfile,
};
