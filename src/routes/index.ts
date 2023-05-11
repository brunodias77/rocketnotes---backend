import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { notesRoutes } from "./notes.routes";
import { tagsRoutes } from "./tags.routes";

const routes: Router = Router();

routes.use(usersRoutes);
routes.use(notesRoutes);
routes.use(tagsRoutes);

export { routes };
