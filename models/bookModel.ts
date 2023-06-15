import mongoose, {Document,Schema} from "mongoose";

export interface IBook extends Document {
    title:string;
    author:string;
    genre:string;
    publicationDate: Date;
    availabilityStatus: "available"| "borrowed";
}

const bookSchema: Schema<IBook> = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required:true,
    },
    genre: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'borrowed'],
        default: 'available'
    }
})

export default mongoose.model<IBook>('books', bookSchema)