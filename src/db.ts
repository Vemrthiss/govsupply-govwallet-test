import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";
import { readCsvAndSave } from "./csv";
dotenv.config();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const STAFF_TABLE = "staff";
export const REDEMPTION_TABLE = "redemption";
export const TEAM_TABLE = "team";

export const connectToDB = async (): Promise<PoolClient | void> => {
  try {
    return pool.connect();
  } catch (e) {
    console.error("could not connect to pg", e);
    return;
  }
};

export const initDB = async (
  seedFile = "staff-id-to-team-mapping-long.csv"
) => {
  const client = await connectToDB();
  if (!client) {
    throw new Error("could not connect to client during db init");
  }

  // create team table
  client.query(
    `CREATE TABLE ${TEAM_TABLE}(team_name VARCHAR(255) NOT NULL PRIMARY KEY)`,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("successfully created team table");
    }
  );

  // create staff mapping table
  client.query(
    `CREATE TABLE ${STAFF_TABLE}(staff_pass_id VARCHAR(255) NOT NULL PRIMARY KEY, team_name VARCHAR(255) REFERENCES ${TEAM_TABLE} (team_name), created_at BIGINT NOT NULL)`,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("successfully created staff table");
    }
  );

  // create redemption table
  client.query(
    `CREATE TABLE ${REDEMPTION_TABLE}(id SERIAL PRIMARY KEY, team_name VARCHAR(255) REFERENCES ${TEAM_TABLE} (team_name), redeemed_at BIGINT NOT NULL)`,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("successfully created redemption table");
    }
  );

  readCsvAndSave(seedFile, client);

  client.release();
};
