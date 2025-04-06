import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

// For development, use a global variable to persist the MongoDB connection
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Correctly export the connection promise
export const connectDB = async () => {
  const client = await clientPromise;
  const db = client.db(); // Access the default database
  return { db };
};
