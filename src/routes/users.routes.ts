import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import EnsureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRoutes: Router = Router();
const userController = new UserController();

usersRoutes.post("/users", userController.create);
usersRoutes.put("/users", EnsureAuthenticated, userController.update);

export { usersRoutes };
