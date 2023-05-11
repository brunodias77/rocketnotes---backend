import { connection } from "../database/knex/index";
import { Request, Response } from "express";
import AppError from "../utils/appError";

export class TagsController {
  async index(request: Request, response: Response) {
    const { user_id } = request.params;

    const tags = await connection("tags").where({ user_id });

    return response.json(tags);
  }
}
