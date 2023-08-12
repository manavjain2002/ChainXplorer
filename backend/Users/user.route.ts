import { validateToken } from "../middleware/jwtToken";
import * as userController from './user.controller';
import express from 'express';

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.put("/update", validateToken, userController.updateUser);

router.delete("/delete", validateToken, userController.deleteUser);

router.post("/addWalletAddress", validateToken, userController.addWalletAddress);

router.get("/currentUser", validateToken, userController.currentUser);

module.exports = router