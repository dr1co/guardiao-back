import connection from "../database/postgres";

interface RegisterContentInteface {
  title: string,
  cover_url: string,
  content_url: string,
  type: string,
  content_time: string
};

async function registerNewContent(content: RegisterContentInteface) {
  await connection.query(
    `INSERT INTO "content" ("title", "cover_url", "content_url", "type", "content_time")
    VALUES ($1, $2, $3, $4, $5)`,
    [content.title, content.cover_url, content.content_url, content.type, content.content_time]
  );
}

async function findContentByTitle(title: string) {
  const result = await connection.query(
    `SELECT * FROM "content" WHERE "title" = $1`,
    [title]
  );
  return result;
}

async function deleteContentById(id: number) {
  await connection.query(
    `DELETE FROM "content"
    WHERE "id" = $1`,
    [id]
  );
}

async function getContentById(id: number) {
  const result = await connection.query(
    `SELECT * FROM "content"
    WHERE "id" = $1`,
    [id]
  )
}

export default {
  registerNewContent,
  findContentByTitle,
  deleteContentById,
  getContentById
}