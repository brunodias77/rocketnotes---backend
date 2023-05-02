import { Router } from "express";
import { UserController } from "../controllers/users.controller";

const usersRoutes: Router = Router();
const userController = new UserController();

usersRoutes.post("/users", userController.create);
usersRoutes.put("/users/:user_id", userController.update);

export { usersRoutes };
