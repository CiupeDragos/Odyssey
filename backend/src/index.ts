import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URL, PORT } from "./util/constants";
import {
  loginUser,
  registerUser,
} from "./routes/Authentication/authentication";
import { getProfileData } from "./routes/User/profile";

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());

//End-points
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/profileData", getProfileData);

const server = http.createServer(app);

server.listen(PORT, "192.168.100.7", () => {
  console.log(`Server running on http://192.168.100.7:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
