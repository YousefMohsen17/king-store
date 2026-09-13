import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/generateToken.js";
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  );
};
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    res.status(201).json({ data: userWithoutPassword });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") }); // ✅ 400, not 500
    }
    console.log("error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    res.status(200).json({ message: "Login Successful", data: user });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      await redis.del(`refreshToken:${decoded.userId}`);
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log("error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token not found" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const storedToken = await redis.get(`refreshToken:${user._id}`);
    if (storedToken !== refreshToken) {
      return res.status(400).json({ message: "Invalid Refresh Token" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    console.log("error in refreshToken controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function checkAuth(req, res) {
  try {
    res.json({ data: req.user });
  } catch (error) {
    console.log("error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
