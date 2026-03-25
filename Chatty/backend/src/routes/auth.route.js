import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { checkAuth } from "../controllers/auth.controller.js";

const  router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

router.put("/update-profile",protectRoute, updateProfile);

router.get("/check-auth", checkAuth, protectRoute);

export default router;