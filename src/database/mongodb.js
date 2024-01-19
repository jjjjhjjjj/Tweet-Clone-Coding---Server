import { MongoClient, ObjectId } from "mongodb";
import { config } from "../../config.js";

const uri = config.mongoDB.uri;
const dbName = config.mongoDB.dbName;
const usersColl = config.mongoDB.usersColl;
const tweetsColl = config.mongoDB.tweetsColl;

let database;

export async function connectDB() {
  return new MongoClient(uri).connect().then((client) => {
    database = client.db(dbName);
  });
}

export function userDB() {
  return database.collection(usersColl);
}

export function tweetDB() {
  return database.collection(tweetsColl);
}

export function formatId(data) {
  return data?._id ? { ...data, id: data._id.toString() } : data;
}

export function newObjectId(id) {
  return new ObjectId(id);
}
