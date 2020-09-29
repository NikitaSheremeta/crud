import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import appliances from './routes/appliances';

dotenv.config();

const MONGO_URI: string = process.env.NODE_ENV === 'test'
  ? process.env.DB_TESTING : process.env.DB_PRODUCT;

const EXIT_CODE = 1;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/appliances', appliances);

async function launch(): Promise<void> {
  try {

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });

  } catch (err) {
    console.log('Server Error', err.message);
    process.exit(EXIT_CODE);
  }
}

launch();

export default app;
