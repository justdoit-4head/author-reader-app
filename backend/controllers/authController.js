const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Token not found, please log in" });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, "secret_key");

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res
        .status(401)
        .json({ error: "User not found with token, try re-logging in" });
    }

    // Attach user object to the request
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
