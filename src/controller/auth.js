import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";
import { config } from "../../config.js";

export const signup = async (req, res) => {
  const { name, username, password, email, url } = req.body;

  const isExist = await authRepository.findByUsername(username);

  if (isExist) {
    return res
      .status(409)
      .json({ message: `Already exists user: ${username}` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

  const userId = await authRepository.createUser({
    name,
    username,
    password: hashed,
    email,
    url,
  });

  const token = await createToken(userId);

  return res.status(201).json({ token, username });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await authRepository.findByUsername(username);

  if (!user) {
    return res.status(404).json({ message: "Invaild user or password" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(404).json({ message: "Invaild user or password" });
  }

  const token = await createToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 30000,
  });
  res.status(200).json({ token, username });
};

export const me = async (req, res) => {
  const user = await authRepository.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: "Not found user" });
  }

  res.status(200).json({ token: req.token, username: user.username });
};

const createToken = async (id) => {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInDay,
  });
};
