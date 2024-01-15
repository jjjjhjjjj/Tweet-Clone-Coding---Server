import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authContoroller from "../controller/auth.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

const validateAuthLogin = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  validate,
];

const validateAuthSignup = [
  ...validateAuthLogin,
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }),

  validate,
];

router.post("/signup", validateAuthSignup, authContoroller.signup);
router.post("/login", validateAuthLogin, authContoroller.login);
router.get("/me", isAuth, authContoroller.me);

export default router;
