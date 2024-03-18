import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./util/constants";

const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
