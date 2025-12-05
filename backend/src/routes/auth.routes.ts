import { Router } from "express";
import {
  signup,
  login,
  logout
} from "../controllers/auth.controller";
import requireAuth from "../middlewares/auth.middleware";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', requireAuth, logout);

export default router;