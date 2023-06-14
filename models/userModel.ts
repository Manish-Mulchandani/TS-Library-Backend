import mongoose, {Document,Schema,Model} from "mongoose";

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    books: {
        bookId:Schema.Types.ObjectId;
        title:string;
    }[];
}


const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true
      },
    },
  ],
});

const UserModel:Model<IUser> = mongoose.model<IUser>("users", userSchema);
export default UserModel;