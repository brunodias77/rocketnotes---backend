import express from "express";
import { connection } from "./database/knex/index";
const app = express();

app.use(express.json());
const port = 8080;

async function addUser() {
  await connection("users").insert({
    name: "Bruno",
    email: "bruno@teste.com",
    password: "123456",
  });
}
addUser();

app.get("/", (req, res) => {
  res.send("Usuário criado com sucesso");
});

app.listen(port, () => {
  return console.log("Servidor ONLINE  🚀 !!! ");
});
