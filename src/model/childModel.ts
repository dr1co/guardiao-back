import connection from "../database/postgres";

interface RegisterChildInterface {
  name: string;
  dob: string;
}

async function findChildByName(name: number) {
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

export default{
  findChildByName,
  registerNewChild
};