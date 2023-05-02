import { Router } from "express";
import NotesController from "../controllers/notes.controller";

const notesRoutes: Router = Router();
const notesController = new NotesController();

notesRoutes.post("/notes/:user_id", notesController.create);

export { notesRoutes };
