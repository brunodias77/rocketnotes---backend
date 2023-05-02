import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { notesRoutes } from "./notes.routes";

const routes: Router = Router();

routes.use(usersRoutes);
routes.use(notesRoutes);

export { routes };
