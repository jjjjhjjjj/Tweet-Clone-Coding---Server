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

function getCollection(name) {
  return database.collection(name);
}

function formatId(data) {
  return data?._id ? { ...data, id: data._id.toString() } : data;
}

export async function getUserByUsername(username) {
  return getCollection(usersColl).findOne({ username }).then(formatId);
}

export async function getUserById(id) {
  return getCollection(usersColl)
    .findOne({ _id: new ObjectId(id) })
    .then(formatId);
}

export async function addUser(user) {
  return getCollection(usersColl)
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

export async function getTweets() {
  return getCollection(tweetsColl)
    .find()
    .toArray()
    .then((tweets) => tweets.map(formatId));
}

export async function getTweetByUsername(username) {
  return getCollection(tweetsColl).findOne({ username }).then(formatId);
}

export async function getTweetById(id) {
  return getCollection(tweetsColl)
    .findOne({ _id: new ObjectId(id) })
    .then(formatId);
}

export async function addTweet(tweet) {
  return getCollection(tweetsColl)
    .insertOne(tweet)
    .then((result) => result.insertedId.toString());
}

export async function updateTweet(id, text) {
  return getCollection(tweetsColl).updateOne(
    { _id: new ObjectId(id) },
    { $set: { text } }
  );
}

export async function deleteTweet(id) {
  return getCollection(tweetsColl).deleteOne({ _id: new ObjectId(id) });
}
