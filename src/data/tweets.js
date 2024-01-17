import * as authRepository from "../data/auth.js";
import {
  addTweet,
  deleteTweet,
  getTweetById,
  getTweets,
  updateTweet,
} from "../database/mongodb.js";

export const getAll = async () => {
  const tweets = await getTweets();

  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await authRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
};

export const getByUsername = async (username) => {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
};

export const getById = async (id) => {
  const tweet = await getTweetById(id);
  if (!tweet) return null;

  const { username, name, url } = await authRepository.findById(tweet.userId);

  return { ...tweet, username, name, url };
};

export const create = async (userId, text) => {
  const tweet = {
    userId,
    text,
    createdAt: new Date(),
  };

  return addTweet(tweet);
};

export const update = async (id, text) => {
  await updateTweet(id, text);

  return id;
};

export const remove = async (id) => {
  await deleteTweet(id);
};
