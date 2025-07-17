import { newObjectId, formatId, tweetDB } from "../database/mongodb.js";
import { findById } from "./auth.js";

export const getAll = async () => {
  return tweetDB()
    .find()
    .sort({ createdAt: -1 }) // ← 정렬하고
    .toArray()
    .then((tweets) => tweets.map(formatId));
};

export const getByUsername = async (username) => {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
};

export const getById = async (id) => {
  return tweetDB()
    .findOne({ _id: newObjectId(id) })
    .then(formatId);
};

export const create = async (userId, text) => {
  const { username, name, url } = await findById(userId);
  const tweet = {
    userId,
    text,
    createdAt: new Date(),
    username,
    name,
    url,
  };

  await tweetDB().insertOne(tweet);
  // .then((result) => {
  //   console.log(result);
  //   result.insertedId.toString();
  // });

  return { ...tweet, id: tweet._id };
};

export const update = async (id, text) => {
  await tweetDB() //
    .updateOne({ _id: newObjectId(id) }, { $set: { text } });

  return id;
};

export const remove = async (id) => {
  await tweetDB().deleteOne({ _id: newObjectId(id) });
};
