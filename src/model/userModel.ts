import connection from "../database/postgres";

interface RegisterUserInterface {
  email: string;
  password: string;
}

// read
async function findUserByEmail(email: string) {
  const result = await connection.query(
    `
    SELECT * FROM "user"
    WHERE email = $1 
  `, // placeholder evita SQL Injection
    [email]
  );

  return result;
}

async function findUserById(id: number) {
  const result = await connection.query(
    `SELECT * FROM "user"
    WHERE id = $1
    `,
    [id]
  );

  return result;
}

// create
async function registerNewUser(user: RegisterUserInterface) {
  await connection.query(
    `
    INSERT INTO "user" ("name", "email", "password")
    VALUES ('temp', $1, $2)
  `,
    [user.email, user.password]
  );
}

async function deleteUser(id: number) { 
  // comandos BEGIN (inicia transação), COMMIT (executa queries) e ROLLBACK (impede persistência se houver um erro) executam queries em cascata
  // Impedem que alterações sejam persistidas se alguma query falhar

  try {
    await connection.query('BEGIN'); // start a transaction

    // delete em cascata
    await connection.query(` 
    DELETE FROM "connection"
    WHERE userId = $1
    `,
      [id]
    ); // DELETAR TODOS OS REGISTROS COM A FOREIGN KEY PARA CHILD

    await connection.query(
      `DELETE FROM "child"
     WHERE id NOT IN (
     SELECT childId FROM "connection"
     WHERE childId IS NOT NULL
     )
    `
    );

    await connection.query(
      `DELETE FROM "alert"
      WHERE childId NOT IN(
      SELECT childId FROM "connection"
      WHERE childId IS NOT NULL
      )
      `
    );

    await connection.query(
      `DELETE FROM "activity"
      WHERE childId NOT IN(
      SELECT childId from "connection"
      WHERE childId IS NOT NULL
      )
      `
    )

    await connection.query(
      `DELETE FROM "device"
      WHERE childId NOT IN(
      SELECT childId from "connection"
      WHERE childId IS NOT NULL
      )
      `
    )

    await connection.query(
      `DELETE FROM "user"
     WHERE id = $1`,
      [id]
    );

    await connection.query('COMMIT');
  } catch (err) { // se houver erros na query, rollback
    await connection.query('ROLLBACK');
    throw err;
  }
}

async function updateUserPassword(id: number, newPassword: string) {
  await connection.query(
    `UPDATE "user"
    SET "password" = $1
    WHERE "id" = $2`,
    [newPassword, id]
  )};

export default {
  findUserByEmail,
  findUserById,
  registerNewUser,
  deleteUser,
  updateUserPassword
};

