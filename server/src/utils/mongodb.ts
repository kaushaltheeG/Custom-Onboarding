import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

const uri = process.env.MONGO_URI || '';
const dbName = process.env.MONGO_DB_NAME;

let connectedDatabase: Db | null = null;

// Connect to the mongo database
export const connectDB = async (): Promise<void> => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    connectedDatabase = client.db(dbName);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

// Get the connected database instance
export const getDB = (): Db => {
  if (!connectedDatabase) {
    throw new Error('Database not connected. Please call connectDB first.');
  }
  return connectedDatabase;
};
