import { Request,Response } from 'express';
import mongoose from 'mongoose';
import bookModel from '../models/bookModel';

export const getBooksController = async (req:Request,res:Response) => {
    try {
        const books = await bookModel.find({});
        res.status(200).json(books);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting books",
            error
        })
    }
}

export const addBookController = async (req:Request,res:Response) => {
    try {
        const { title, author, genre, publicationDate, availabilityStatus } = req.body
        const newBook = await new bookModel({title,author,genre,publicationDate,availabilityStatus}).save()
        res.status(200).send({
            success:true,
            message: "Book Added Successfully",
            newBook,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting books",
            error
        })
    }
}

export const getBookById = async (req:Request,res:Response) => {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        if(!book){
            return res.status(400).send({
                success: false,
                message: "Book with the specified id not found"
            })
        }
        res.status(200).send(book)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting book by Id",
            error
        })
    }
}


export const updateBookById = async (req:Request,res:Response) => {
    try {
        const bookId = req.params.id;
        const updatedData = req.body;
        
        const book = await bookModel.findByIdAndUpdate(bookId, updatedData, {new:true})
        if(!book){
            return res.status(400).send({
                error: "Book not found"
            })
        }
        res.status(200).send({
            book
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating book by Id",
            error
        })
    }
}

export const deleteBookById = async (req:Request,res:Response) => {
    try {
        const bookId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({
                message: "Invalid Book ID"
            })
        }

        const deletedBook = await bookModel.findByIdAndRemove(bookId)
        if(!deletedBook) {
            return res.status(400).send({
                message: "Book not found"
            })
        }
        return res.status(200).send({
            message: "Book deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting book by Id",
            error
        })
    }
}
