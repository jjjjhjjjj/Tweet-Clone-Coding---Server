import dotenv from "dotenv";
dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error(`Key(${key}) is undefined!`);
  }

  return value;
};

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET_KEY"),
    expiresInDay: required("JWT_EXPIRES_IN_DAY", "2d"),
  },
  bcrypt: {
    saltRounds: parseInt(required("SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  mongoDB: {
    uri: required("MONGO_DB_URI"),
    dbName: required("MONGO_DB_NAME", "dwitter"),
    usersColl: required("MONGO_DB_USERS_COLLECTION", "users"),
    tweetsColl: required("MONGO_DB_TWEETS_COLLECTION", "dweets"),
  },
};
