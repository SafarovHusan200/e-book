const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// @Route         api/v1/auth/register
// @Description   user registerd
// Access         Public
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill all fields",
      });
    }

    // Existing user
    const ExisingUser = await User.findOne({ email });
    if (ExisingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // Password  hashed
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // save new user
    const user = new User({ username, email, password: hashPassword });
    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

// @Route         api/v1/auth/login
// @Description   user login
// Access         Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not register",
      });
    }

    // password compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In Login Callback",
      error,
    });
  }
};
