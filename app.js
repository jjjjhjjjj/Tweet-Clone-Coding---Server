import express from "express";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AuthRouterr from "./src/routes/auth.js";
import TweetsRouter from "./src/routes/tweets.js";
import { config } from "./config.js";
import { initSocket } from "./src/network/socket.js";
import { connectDB } from "./src/database/mongodb.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: config.cors.allowedOrigin,
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", AuthRouterr);
app.use("/tweets", TweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    //getUserByUsername("one").then(console.log);
    const server = app.listen(config.host.port);

    initSocket(server);
  })
  .catch(console.error);
