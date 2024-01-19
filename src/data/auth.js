import { newObjectId, formatId, userDB } from "../database/mongodb.js";

export const findByUsername = async (username) => {
  return userDB().findOne({ username }).then(formatId);
};

export const findById = async (userId) => {
  return userDB()
    .findOne({ _id: newObjectId(userId) })
    .then(formatId);
};

export const createUser = async (user) => {
  const created = {
    createdAt: new Date(),
    ...user,
  };

  return userDB()
    .insertOne(created)
    .then((result) => result.insertedId.toString());
};
