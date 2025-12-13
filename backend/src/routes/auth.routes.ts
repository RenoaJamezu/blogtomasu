import { Router } from "express";
import {
  signup,
  login,
  logout,
  // verifyOTP,
  // resendOTP,
  getMe
} from "../controllers/auth.controller";
import requireAuth from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post("/verify-otp", verifyOTP);
// router.post("/resend-otp", resendOTP);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

export default router;