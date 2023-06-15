import express, {Router} from 'express';
import { addBookController, deleteBookById, getBookById, getBooksController, updateBookById } from '../controllers/bookController';

export const bookRoute:Router = express.Router()

// Get all Books
bookRoute.get('/', getBooksController)

// Add a book
bookRoute.post('/', addBookController)

// Get book by Id
bookRoute.get('/:id', getBookById)

// Update book by Id
bookRoute.put('/:id', updateBookById)

// Delete book by Id
bookRoute.delete('/:id', deleteBookById)
