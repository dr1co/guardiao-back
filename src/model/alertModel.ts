import connection from "../database/postgres";

interface RegisterAlertInterface {
  childId: number, 
  type: string,
  message: string,
  content: Buffer,
  createdAt: Date
}

async function registerNewAlert(alert: RegisterAlertInterface) {
  await connection.query(`
    INSERT INTO "alert" ("childId", "type", "message", "content", "createdAt")
    VALUES ($1, $2, $3, $4, $5)
    `,
    [alert.childId, alert.type, alert.message, alert.content, alert.createdAt]
  );
}

export default {
  registerNewAlert,
}