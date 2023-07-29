const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Initialize env variables
dotenv.config();

// Connection to database
connectDB();

// App instance
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Register routes
app.use("/api/v1/auth", require("./routes/user.route"));
app.use(require("./middlewares/error"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
