import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export async function isAuth(req, res, next) {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in isAuth middleware", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}
export async function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized - Admin only" });
  }
}
