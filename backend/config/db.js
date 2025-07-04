import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1); // exit code 1 means exit with failure, 0 means success.
  }
};
