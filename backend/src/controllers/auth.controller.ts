import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/auth.middleware";
import { generateOTP, sendOTPEmail } from "../utils/email.services";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as {
      name: string,
      email: string,
      password: string
    };

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    try {
      await sendOTPEmail(email, otp);
    } catch (err) {
      console.error("Failed to send OTP email", err);
    }

    await User.create({
      name,
      email,
      passwordHash,
      otp,
      otpExpire
    });

    return res.status(201).json({ message: "User registered. Please verify OTP sent to email" });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export async function verifyOTP(req: Request, res: Response) {
  try {
    const { email, otp } = req.body as {
      email: string,
      otp: string
    };

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    if (user.otp !== otp || user.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP is invalid or expired" });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpire = new Date(Date.now());
    await user.save();

    const token = jwt.sign(
      { userId: String(user._id) },
      process.env['JWT_SECRET_KEY'] as string,
      { expiresIn: "24h" },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

export async function resendOTP(req: Request, res: Response) {
  try {
    const { email } = req.body as { email: string };

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendOTPEmail(email, otp, "Resend OTP verification");
    } catch (err) {
      console.error("Failed to send OTP email", err);
    }

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error resending OTP" });
  }
};

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as {
      email: string,
      password: string
    };

    if (!email || !password) return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      try {
        await sendOTPEmail(email, otp, "Resend OTP verification");
      } catch (err) {
        console.error("Failed to send OTP email", err);
      }

      return res.status(403).json({ message: "Verify email first. OTP sent to email" });
    };

    const token = jwt.sign(
      { userId: String(user._id) },
      process.env['JWT_SECRET_KEY'] as string,
      { expiresIn: "24h" },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({ message: "Logged in" });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  };
};

export async function logout(req: AuthRequest, res: Response) {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  };
};

export async function getMe(req: AuthRequest, res: Response) {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  };

  const user = await User.findById(req.userId).select("name email description location createdAt");
  return res.status(200).json({
    user,
    isValid: true
  });
};

export default { signup, verifyOTP, resendOTP, login, logout, getMe };