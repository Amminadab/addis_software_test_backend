import { config } from "dotenv";
config();

export default {
  env: process.env.NODE_ENV as string,
  mongoDB: process.env.MONGO_DB_REMOTE as string,
  delete_key: <string>process.env.DELETE_KEY,
};
