import mongoose, { ConnectOptions } from 'mongoose';
export const connectDB = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URL || ''
        const conn = await mongoose.connect(mongoUri)
        console.log(`Connected to Mongodb Database ${mongoUri}`)
    } catch (error) {
        console.log(`Error in Mongodb, ${error}`)
    }
  };
  