import fs from "fs";
import * as fastcsv from "fast-csv";
import { PoolClient } from "pg";
import { STAFF_TABLE, TEAM_TABLE } from "./db";

export const readCsvAndSave = (filename: string, client: PoolClient): void => {
  const stream = fs.createReadStream(`./csv/${filename}`);
  const data: any[] = [];
  const teams: string[] = [];
  const csvStream = fastcsv
    .parse({ headers: true })
    .on("data", (row) => {
      data.push(row);
      if (!teams.includes(row.team_name)) {
        teams.push(row.team_name);
      }
    })
    .on("end", async () => {
      teams.forEach((team) => {
        client.query(
          `INSERT INTO ${TEAM_TABLE} (team_name) VALUES ('${team}')`,
          (err) => {
            if (err) {
              console.log(err.stack);
            }
          }
        );
      });

      data.forEach((row) => {
        client.query(
          `INSERT INTO ${STAFF_TABLE} (staff_pass_id, team_name, created_at) VALUES ('${row.staff_pass_id}', '${row.team_name}', ${row.created_at})`,
          (err) => {
            if (err) {
              console.log(err.stack);
            }
          }
        );
      });
    });

  stream.pipe(csvStream);
};
