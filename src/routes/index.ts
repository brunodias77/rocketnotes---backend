import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { notesRoutes } from "./notes.routes";
import { tagsRoutes } from "./tags.routes";
import { sessionRoutes } from "./sessions.routes";

const routes: Router = Router();

routes.use(usersRoutes);
routes.use(notesRoutes);
routes.use(tagsRoutes);
routes.use(sessionRoutes);

export { routes };
