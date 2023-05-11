import { Router } from "express";
import { TagsController } from "../controllers/tagsController";

const tagsRoutes: Router = Router();
const tagsController = new TagsController();

tagsRoutes.get("/tags/:user_id", tagsController.index);

export { tagsRoutes };
