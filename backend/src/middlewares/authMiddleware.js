import jwt from "jsonwebtoken";
import User from "../models/User";

const protectAuth = async (req, res, next) => {
  try {
    // Check for token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Get token from header
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    // Proceed
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protectAuth;
