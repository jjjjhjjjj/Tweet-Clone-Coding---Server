import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as TweetController from "../controller/tweets.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  validate,
];

// isAuth,

router.get("/", TweetController.getTweets);
router.get("/:id", TweetController.getTweet);
router.post("/", isAuth, validateTweet, TweetController.createTweet);
router.put("/:id", isAuth, validateTweet, TweetController.updateTweet);
router.delete("/:id", isAuth, TweetController.removeTweet);

export default router;
