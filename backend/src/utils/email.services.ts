
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// email transporter set up
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 1,
  maxMessages: 5,
  auth: {
    user: process.env["GMAIL_USER"],
    pass: process.env["GMAIL_PASS"]
  }
});

// generate otp
export const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// send OTP email
export async function sendOTPEmail(email: string, otp: string, subject: string = "OTP Verification") {
  return transporter.sendMail({
    from: process.env["GMAIL_USER"],
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>BlogTomasu Email Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="color: #4F46E5; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  });
}