import mongoose from 'mongoose'


const connectDB = async () => {
    try {

        await mongoose.connect(`${process.env.DB_URI}`)
        console.log(`\n MongoDB connected !! DB HOST`);
    } catch (error) {
        console.error("MongoDB Connection Failed : ", error);
    }
}

export default connectDB;