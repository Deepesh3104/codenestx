import jwt from "jsonwebtoken";
import User from "../models/user_models.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role === "Admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized, only Admin can access this resource" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
