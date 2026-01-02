const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    // If role is allowed, continue
    next();
  };
};
