import { connection } from "../database/knex/index";
import { Request, Response } from "express";
import AppError from "../utils/appError";

type Notes = {
  title: string;
  descriptions: string;
  tags: string[];
  links: string[];
};

export default class NotesController {
  async create(request: Request, response: Response) {
    const { title, descriptions, tags, links } = request.body as Notes;
    const { user_id } = request.params;
    const checkUserExists = await connection
      .select("*")
      .from("users")
      .where("id", user_id)
      .first();
    if (!checkUserExists) {
      throw new AppError("Usuario nao encontrado", 404);
    }
    const [note_id] = await connection("notes")
      .insert({
        title,
        descriptions,
        user_id,
      })
      .returning("id");
    const linksInsert = links.map((link) => {
      return {
        note_id: note_id.id,
        url: link,
      };
    });
    await connection("links").insert(linksInsert);
    const tagsInsert = tags.map((name) => {
      return {
        note_id: note_id.id,
        name,
        user_id,
      };
    });
    await connection("tags").insert(tagsInsert);
    response.json({ message: "tags inserted" });
  }

  // async show(request: Request, response: Response) {
  //   const { id } = request.params;

  //   const note = await knex("notes").where({ id }).first();
  //   const tags = await knex("tags").where({ note_id: id }).orderBy("name");
  //   const links = await knex("links")
  //     .where({ note_id: id })
  //     .orderBy("created_at");

  //   return response.json({
  //     ...note,
  //     tags,
  //     links,
  //   });
  // }

  // async delete(request: Request, response: Response) {
  //   const { id } = request.params;

  //   await knex("notes").where({ id }).delete();

  //   return response.json();
  // }

  // async index(request: Request, response: Response) {
  //   const { title, user_id, tags } = request.query;

  //   let notes;

  //   if (tags) {
  //     const filterTags = tags.split(",").map((tag) => tag.trim());

  //     notes = await knex("tags")
  //       .select(["notes.id", "notes.title", "notes.user_id"])
  //       .where("notes.user_id", user_id)
  //       .whereLike("notes.title", `%${title}%`)
  //       .whereIn("name", filterTags)
  //       .innerJoin("notes", "notes.id", "tags.note_id")
  //       .orderBy("notes.title");
  //   } else {
  //     notes = await knex("notes")
  //       .where({ user_id })
  //       .whereLike("title", `%${title}%`)
  //       .orderBy("title");
  //   }

  //   const userTags = await knex("tags").where({ user_id });
  //   const notesWithTags = notes.map((note) => {
  //     const noteTags = userTags.filter((tag) => tag.note_id === note.id);

  //     return {
  //       ...note,
  //       tags: noteTags,
  //     };
  //   });

  //   return response.json(notesWithTags);
  // }
}
