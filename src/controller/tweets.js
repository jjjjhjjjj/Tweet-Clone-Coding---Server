import * as TweetRepository from "../data/tweets.js";
import { emitSocket } from "../network/socket.js";

export const getTweets = async (req, res) => {
  const username = req.query.username;
  const data = await (username
    ? TweetRepository.getByUsername(username)
    : TweetRepository.getAll());

  res.status(200).json(data);
};

export const getTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await TweetRepository.getById(id);

  if (!tweet) {
    return res.status(404).json({ message: "Not found tweet by id" });
  }

  res.status(200).json(tweet);
};

export const createTweet = async (req, res) => {
  const { text } = req.body;
  const tweet = await TweetRepository.create(req.userId, text);

  emitSocket("tweets", tweet);

  res.status(201).json(tweet);
};

export const updateTweet = async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  const tweet = await TweetRepository.update(id, text);

  if (!tweet) {
    return res.status(404).json({ message: "Not found tweet by id" });
  }

  if (tweet.userId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.status(201).json(tweet);
};

export const removeTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await TweetRepository.getById(id);

  if (tweet.userId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await TweetRepository.remove(id);

  res.status(204).send();
};
