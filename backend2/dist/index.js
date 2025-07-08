import express from "express";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://mio:99958980Miow@mioclus.zmdehbh.mongodb.net/food-test/foods"
);

const server = express();
server.use(express.json());

const port = 3000;

server.get("/", (_request, response) => {
  response.send("Hello miow");
});

server.listen(port, () => {
  console.log(`Server aslaa http://localhost:${port}`);
});
