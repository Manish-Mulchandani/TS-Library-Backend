import { Request, Response } from 'express';
import mongoose, { Types,ObjectId } from 'mongoose';
import bookModel, {IBook} from '../models/bookModel.js';
import userModel, {IUser} from '../models/userModel.js';

interface AuthenticatedRequest extends Request {
  userId?:string;
}


export const borrowBookController = async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.params.userId === req.userId) {
        const bookId = new Types.ObjectId(req.params.bookId);
        const book:IBook|null = await bookModel.findById(bookId);
        if (!book) {
          return res.status(400).send({
            message: 'Book not found',
          });
        }
        if (book.availabilityStatus === 'borrowed') {
          return res.status(400).send({
            message: 'Book is already borrowed',
          });
        }
        const borrowedBook = {
          bookId: req.params.bookId,
          title: book.title,
        };
  
        const user: IUser | null = await userModel.findById(req.params.userId);
        if (!user) {
          return res.status(400).send({
            message: 'User not found',
          });
        }
        user.books.push(borrowedBook);
        await user.save();
  
        book.availabilityStatus = 'borrowed';
        await book.save();
        return res.status(200).send({
          message: 'Book borrowed successfully',
          book,
        });
      } else {
        return res.status(400).send({
          error: 'Different user signed in',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: 'Something went wrong while borrowing book',
        error,
      });
    }
  };

export const returnBookController = async (req:AuthenticatedRequest,res:Response) => {
    try {
        if(req.params.userId  === req.userId){
            const bookId = req.params.bookId
            const book = await bookModel.findById(bookId)
            const user = await userModel.findById(req.params.userId)
            if(!book) {
                return res.status(400).send({
                    message: "Book not found"
                })
            }
            if(!user){
              return res.status(400).send({
                message: "User not found"
              })
            }
            if(book.availabilityStatus === 'available'){
                return res.status(400).send({
                    message: "This book is not borrowed"
                })
            }

            const bookIndex = user.books.findIndex(book => book.bookId.toString() === bookId)
            if(bookIndex===-1)
            {
                return res.status(400).send({
                    error: "Book never borrowed by user"
                })
            }
            user.books.splice(bookIndex, 1)
            await user.save()

            book.availabilityStatus = 'available'
            await book.save()
            return res.status(200).send({
                message: "Book returned successfully",
                book
            })
            
        } else {
            return res.status(400).send({
                error: "Different user signed in"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Something went wrong while returning book",
            error
        })
    }
    
}

export const getUserBooksController = async (req:Request,res:Response) => {
    try {
        const userId = req.params.userId
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).send({
                message: "User not found"
            })
        }
        const borrowedBookIds = user.books.map(book => book.bookId)
        const borrowedBooks = await bookModel.find({_id:{$in:borrowedBookIds}})
        res.json({borrowedBooks})
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Something went wrong while getting books issues by user",
            error
        })
    }
    
}