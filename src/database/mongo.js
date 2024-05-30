import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient(process.env.DATABASEURL);
await client.connect();

const database = client.db(process.env.DATABASENAME);

await database.createCollection("users");
await database.createCollection("games");
await database.createCollection("wikis");
await database.createCollection("events");
await database.createCollection("topics");
await database.createCollection("messages");

//hub
export const users = database.collection("users");
export const games = database.collection("games");
export const events = database.collection("events");

//wiki
export const wikis = database.collection("wikis");

//forum
export const topic = database.collection("topics");
export const message = database.collection("messages")