import express from "express";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URL, PORT } from "./util/constants";
import {
  loginUser,
  registerUser,
} from "./routes/Authentication/authentication";
import { getProfileData, updateProfileData } from "./routes/User/profile";
import bodyParser from "body-parser";

const app = express();
const profileImagesPath = path.join(__dirname, "..", "public", "profile");

app.use(cors({ credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/profile", (req, res) => {
  express.static(profileImagesPath)(req, res, (err) => {
    console.log(err?.message);
    res.sendFile(path.join(profileImagesPath, "no_profile_picture.png"));
  });
});

//End-points

// Auth
app.post("/register", registerUser);
app.post("/login", loginUser);

// Profile
app.get("/profileData", getProfileData);
app.post("/updateProfileData", updateProfileData);

const server = http.createServer(app);

server.listen(PORT, "192.168.100.7", () => {
  console.log(`Server running on http://192.168.100.7:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
