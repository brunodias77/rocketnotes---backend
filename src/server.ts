import express from "express";
import { json } from "stream/consumers";

const app = express();

app.use(express.json());
const port = 8080;

app.get("/", (req, res) => {
  res.send("Usuário criado com sucesso");
});

app.listen(port, () => {
  return console.log("Servidor ONLINE  🚀 !!! ");
});