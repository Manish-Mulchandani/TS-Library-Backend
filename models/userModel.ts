import mongoose, {Document,Schema} from "mongoose";

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    books: {
        bookId:string;
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
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true
      },
    },
  ],
});

export default mongoose.model<IUser>('users', userSchema)
//const UserModel:Model<IUser> = mongoose.model<IUser>("users", userSchema);
//export default UserModel;