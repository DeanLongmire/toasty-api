import express from "express";
import cors from "cors";
import playerRoutes from "./resources/players";
import { connect } from "./database.js";

const app = express();
const port = 8080;

app.use(cors({
  origin: '*',
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/players', playerRoutes);

connect();
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});