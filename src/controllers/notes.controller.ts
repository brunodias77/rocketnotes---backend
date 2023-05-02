import { connection } from "../database/knex/index";
import { Request, Response } from "express";

type Notes = {
  title: string;
  description: string;
  tags: string[];
  links: string[];
};

export default class NotesController {
  async create(request: Request, response: Response) {
    console.log("aqui");
    const { title, description, tags, links } = request.body as Notes;
    const { user_id } = request.params;
    console.log(title, description, tags, links, user_id);
    const notes_id = await connection("notes").insert({
      title,
      description,
      user_id,
    });
    console.log(notes_id);
    // const linksInsert = links.map((link) => {
    //   return {
    //     notes_id,
    //     url: link,
    //   };
    // });
    // [
    //   { notes_id: [ 8 ], url: 'links1' },
    //   { notes_id: [ 8 ], url: 'link2' }
    // ]
    // insert into `links` (`notes_id`, `url`) select 8 as `notes_id`, 'links1' as `url` union all select 8 as `notes_id`, 'link2' as `url` - SQLITE_CONSTRAINT: FOREIGN KEY constraint failed
    // console.log(notes_id);
    // console.log(linksInsert);
    // await connection("links").insert(linksInsert);
    // const tagsInsert = tags.map((name) => {
    //   return {
    //     notes_id,
    //     name,
    //     user_id,
    //   };
    // });
    // await connection("tags").insert(tagsInsert);
    // response.json();
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
