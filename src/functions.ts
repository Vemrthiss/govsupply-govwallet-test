import { REDEMPTION_TABLE, STAFF_TABLE, connectToDB } from "./db";

const getClient = async () => {
  const client = await connectToDB();
  if (!client) {
    throw new Error("could not connect to client");
  }
  return client;
};

export interface Staff {
  staff_pass_id: string;
  team_name: string;
  created_at: number;
}

export interface GetStaffQuery {
  staff_id?: string;
  team_name?: string;
}

export interface Redemption {
  id: number;
  team_name: string;
  redeemed_at: number;
}

export const getStaff = async (params: GetStaffQuery): Promise<Staff[]> => {
  const client = await getClient();
  const whereClauses: string[] = []; // there will at least be 1
  if (params.staff_id) {
    whereClauses.push(`staff_pass_id = '${params.staff_id}'`);
  }
  if (params.team_name) {
    whereClauses.push(`team_name = '${params.team_name}'`);
  }
  const res = await client.query(
    `SELECT * FROM ${STAFF_TABLE} WHERE ${whereClauses.join(" AND ")}`
  );
  client.release();
  return res.rows as Staff[];
};

export const checkTeamHasRedeemed = async (teamName: string) => {
  const client = await getClient();
  const res = await client.query(
    `SELECT * FROM ${REDEMPTION_TABLE} WHERE team_name = '${teamName}'`
  );
  client.release();
  return res.rows.length >= 1; // should in fact be a strict equality, enforced by the databases's FK constraint on team table
};

export const processTeamRedemption = async (
  teamName: string
): Promise<Redemption[]> => {
  const hasTeamRedeemed = await checkTeamHasRedeemed(teamName);
  if (hasTeamRedeemed) {
    throw new Error("cannot redeem as team has already redeemed!");
  }

  const client = await getClient();
  const res = await client.query(
    `INSERT INTO ${REDEMPTION_TABLE} VALUES (DEFAULT, '${teamName}', ${Date.now()})`
  );
  client.release();
  return res.rows as Redemption[];
};
