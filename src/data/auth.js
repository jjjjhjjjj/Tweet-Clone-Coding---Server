import {
  addUser,
  getUserById,
  getUserByUsername,
} from "../database/mongodb.js";

export const findByUsername = async (username) => {
  return getUserByUsername(username);
};

export const findById = async (userId) => {
  return getUserById(userId);
};

export const createUser = async (user) => {
  const created = {
    createdAt: new Date(),
    ...user,
  };

  return addUser(created);
};
