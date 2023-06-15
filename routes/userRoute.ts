import express,{Router} from "express";
import requireSignIn from "../middlewares/authMiddleware.js";
import { borrowBookController, getUserBooksController, returnBookController } from "../controllers/userController.js";

export const userRoute:Router = express.Router()

// Borrow a book
userRoute.post('/:userId/books/:bookId', requireSignIn, borrowBookController)

// Return a book
userRoute.put('/:userId/books/:bookId', requireSignIn, returnBookController)

// Get all books borrowed by a specific user
userRoute.get('/:userId/books', getUserBooksController)
