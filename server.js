const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;
const app = express();
const path = require("../ChurchApi/Router");
const MONGODB_URL =
  "mongodb+srv://t62xbdtv8YyUmtj3:t62xbdtv8YyUmtj3@cluster0.zqyac.mongodb.net/foodDB?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .on("open", () => {
    console.log("database connected successfully");
  })
  .once("error", () => {
    console.log("failed while connecting to the database");
  });

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("am creating my own api");
});

app.use("/food/api", path);
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
