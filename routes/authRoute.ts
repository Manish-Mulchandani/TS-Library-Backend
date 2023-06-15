import express, {Router} from "express";
import { loginController, registerController } from "../controllers/authController";
//import { requireSignIn } from "../middlewares/authMiddleware";

export const authRoute:Router = express.Router()

// Register
authRoute.post('/register', registerController)

// Login
authRoute.post('/login', loginController)
