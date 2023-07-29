const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Please enter valid email adress",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    adminStatus: {
      type: Boolean,
      default: false,
    },
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hashing password with bcrypt
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// Generated jwt token
// userSchema.methods.generateJwtToken = function () {
//   return jwt.sign(
//     { id: this._id, email: this.email },
//     process.env.JWT_TOKEN_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRE,
//     }
//   );
// };

// Check user entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = model("User", userSchema);
