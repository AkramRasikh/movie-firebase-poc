require("dotenv").config();
const express = require("express");
const { getFirebaseDB } = require("./db");
const app = express();

app.get("/", async function (_, res) {
  try {
    const movieList = await getFirebaseDB();
    res.send(movieList);
  } catch (error) {
    res.status(404).send("err sending movies");
  }
});

const port =
  process.env.NODE_ENV === "test" ? process.env.HOST_TEST : process.env.HOST;

console.log("running on port ", port);

app.listen(3000);
