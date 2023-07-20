const User = require("../db/userModel");
const bcrypt = require("bcrypt");

// Registration
const registerUser = (request, response) => {
  const { firstname, lastname, email, address, password } = request.body;

  // Check if the email already exists
  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        // Email already exists
        response.status(409).send({
          message: "Email already exists",
        });
      } else {
        // Hash the password
        bcrypt.hash(password, 10, (error, hashedPassword) => {
          if (error) {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          } else {
            // Create a new user instance with the hashed password
            const user = new User({
              firstname,
              lastname,
              email,
              address,
              password: hashedPassword,
            });
            // Save the new user
            user
              .save()
              .then((result) => {
                response.status(201).send({
                  message: "User Created Successfully",
                  result,
                });
              })
              .catch((error) => {
                response.status(500).send({
                  message: "Error creating user",
                  error,
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error finding user",
        error,
      });
    });
};

module.exports = {
  registerUser,
};
