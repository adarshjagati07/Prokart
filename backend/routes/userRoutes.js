import express from "express";
import { authUser, registerUser, logoutUser, deleteUser, getUsers, getUserProfile, updateUserProfile, getUserByID, updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//these all are connected to /api/users
router.post("/logout", logoutUser);
router.post("/login", authUser);

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);

export default router;
