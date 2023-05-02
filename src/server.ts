import express from "express";
import { routes } from "./routes/index";
import { errorMiddleware } from "./middlewares/error";

const app = express();

app.use(express.json());
app.use(errorMiddleware);
app.use(routes);

const port = 8080;

app.listen(port, () => {
  return console.log("Servidor ONLINE  🚀 !!! ");
});
