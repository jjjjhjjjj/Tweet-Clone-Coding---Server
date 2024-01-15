import * as authRepository from "../data/auth.js";

let tweets = [
  {
    id: "2",
    text: "안뇽!",
    createdAt: Date.now().toString(),
    userId: "1",
  },
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: Date.now().toString(),
    userId: "1687848368285",
  },
];

export const getAll = async () => {
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
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (!tweet) return null;

  const { username, name, url } = await authRepository.findById(tweet.userId);

  return { ...tweet, username, name, url };
};

export const create = async (userId, text) => {
  const tweet = {
    id: Date.now().toString(),
    userId,
    text,
    createdAt: new Date(),
  };

  tweets = [tweet, ...tweets];

  return getById(tweet.id);
};

export const update = async (id, text) => {
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return getById(tweet.id);
};

export const remove = async (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id);
};
