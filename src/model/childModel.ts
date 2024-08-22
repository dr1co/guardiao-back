import connection from "../database/postgres";

interface RegisterChildInterface {
  name: string;
  dob: string;
}

async function findChildByName(name: string) {
  const result = await connection.query(
  `
  SELECT * FROM "child"
  WHERE name = $1
  `, 
  [name]
  );
  return result;
}

async function registerNewChild(child: RegisterChildInterface) {
  await connection.query(
    `INSERT INTO "child" ("name", "dob")
     VALUES ($1, $2)
    `, 
    [child.name, child.dob]
  );
}

async function findChildByUserId(id: number) {
  const result = await connection.query(
    `
    SELECT child.*, alert.* 
    FROM child
    INNER JOIN connection ON child.id = connection.childId
    LEFT JOIN alert ON child.id = alert.childId 
    WHERE connection.userId = $1
    `,
    [id] // left join retorna crianças mesmo se elas não tiverem alerta associado
  );
  return result.rows;
}

async function findAlertByChildId(id: number) {
  const result = await connection.query(
    `
    SELECT alert.*
    FROM alert
    INNER JOIN child ON child.id = alert.childId
    WHERE child.id = $1
    `,
    [id]
  );
  return result.rows;
}

async function deleteChildById(id: number) {
  await connection.query('BEGIN');

  try {
  await connection.query(
    `
    DELETE FROM "connection" 
    WHERE childId = $1
    `,
    [id]);

    await connection.query(
      `
      DELETE FROM "alert"
      WHERE childId = $1
      `,
      [id]
    );

    await connection.query(
      `
      DELETE FROM "activity"
      WHERE childId = $1
      `,
      [id]
    );

    await connection.query(
      `
      DELETE FROM "device"
      WHERE childId = $1
      `,
      [id]
    );


    await connection.query('COMMIT'); 
  } catch(err) {
    await connection.query('ROLLBACK');
    throw err;
  }
}

export default{
  findChildByName,
  registerNewChild,
  findChildByUserId,
  findAlertByChildId,
  deleteChildById
};