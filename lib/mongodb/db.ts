// File: db.ts
// Purpose: This module is responsible for establishing a connection with MongoDB using both the Mongoose library and MongoDB native driver.
// It provides four main functions:
// - connectToDatabaseWithMongoose: connects to MongoDB with Mongoose and returns a Mongoose instance.
// - connectToDatabaseWithMongoClient: connects to MongoDB with MongoClient and returns a MongoClient instance.
// - closeDatabaseWithMongoose: closes the MongoDB connection established by Mongoose.
// - closeDatabaseWithMongoClient: closes the MongoDB connection established by MongoClient.
// This module is designed with connection caching in mind to enhance performance by reusing existing connections instead of creating new ones every time a connection is required.

import mongoose, {Connection} from "mongoose";
import {MongoClient} from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_DEFAULT = process.env.MONGODB_DB as string;

// Connection and database instances for Mongoose (cached for reuse)
let cachedClientMongoose: Connection | null;
let cachedDbMongoose: typeof mongoose | null;

// Connection instance for MongoClient (cached for reuse)
let cachedClientMongoClient: MongoClient | null;

if (!MONGODB_URI) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Purpose: Connects to MongoDB with Mongoose and returns the Mongoose instance.
export async function connectToDBWithMongoose(dbName: string = DB_DEFAULT) {
    if (cachedClientMongoose && cachedDbMongoose) {
        return {client: cachedClientMongoose, db: cachedDbMongoose};
    }

    const db = await mongoose.connect(MONGODB_URI, {dbName});

    cachedDbMongoose = db;
    cachedClientMongoose = db.connection;

    return {client: cachedClientMongoose, db: cachedDbMongoose};
}

// Purpose: Connects to MongoDB with MongoClient and returns the MongoClient instance.
export async function connectToDBWithMongoClient(dbName: string = DB_DEFAULT) {
    if (cachedClientMongoClient) {
        return cachedClientMongoClient;
    }

    cachedClientMongoClient = new MongoClient(MONGODB_URI);

    await cachedClientMongoClient.connect();

    // return cachedClientMongoClient.db(dbName);
    return cachedClientMongoClient;
}

// Purpose: Closes the MongoDB connection when it's not needed anymore.
export async function closeDBWithMongoose() {
    if (cachedDbMongoose) {
        await cachedDbMongoose.connection.close();
        cachedClientMongoose = null;
        cachedDbMongoose = null;
    }
}

// Purpose: Closes the MongoDB connection when it's not needed anymore.
export async function closeDBWithMongoClient() {
    if (cachedClientMongoClient) {
        await cachedClientMongoClient.close();
        cachedClientMongoClient = null;
    }
}
