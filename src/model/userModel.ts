import connection from "../database/postgres";

interface RegisterUserInterface {
  name: string;
  email: string;
  password: string;
}

async function findUserByEmail(email: string) {
  const result = await connection.query(
    `
    SELECT * FROM "user"
    WHERE email = $1
  `,
    [email]
  );

  return result;
}

async function registerNewUser(user: RegisterUserInterface) {
  await connection.query(
    `
    INSERT INTO "user" ("name", "email", "password")
    VALUES ($1, $2, $3)
  `,
    [user.name, user.email, user.password]
  );
}

export default {
  findUserByEmail,
  registerNewUser,
};
