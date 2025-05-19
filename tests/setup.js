import mongoose from 'mongoose';
import { server } from '../server';
const TEST_DB = 'humanchain-test';

beforeAll(async () => {
  try {
    await mongoose.disconnect();
    await mongoose.connect(`mongodb://localhost:27017/${TEST_DB}`);
  } catch (error) {
    console.error('Test database connection error:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
    server.close();
  } catch (error) {
    console.error('Test cleanup error:', error);
    throw error;
  }
});