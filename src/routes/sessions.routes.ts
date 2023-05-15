import { Router } from "express";
import SessionsController from "../controllers/sessionsController";

const sessionRoutes: Router = Router();
const sessionController = new SessionsController();
sessionRoutes.post("/sessions", sessionController.create);
export { sessionRoutes };
