import connection from "../database/postgres";

interface RegisterActivityInterface {
  childId: number,
  type: string,
  message: string,
  content: Buffer,
  startOfActivity: Date,
  endOfActivity: Date
}

async function registerNewActivity(activity: RegisterActivityInterface) {
  await connection.query(`
    INSERT INTO "activity" ("childId", "type", "message", "content", "startOfActivity", "endOfActivity")
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [activity.childId, activity.type, activity.message, activity.content, activity.startOfActivity, activity.endOfActivity] 
  );

};

export default {
  registerNewActivity
};