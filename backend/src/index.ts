import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./util/constants";
import { loginUser, registerUser } from "./routes/authentication";

const app = express();

app.use(bodyParser.json());

//End-points
app.post("/register", registerUser);
app.post("/login", loginUser);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
