import express, {Router} from "express";
import { loginController, registerController } from "../controllers/authController";
import { requireSignIn } from "../middlewares/authMiddleware";

const router:Router = express.Router()

// Register
router.post('/register', registerController)

// Login
router.post('/login', loginController)

// test
//router.get('/test', requireSignIn, testController)

export default router