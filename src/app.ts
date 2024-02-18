import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {
  GetStaffQuery,
  Staff,
  checkTeamHasRedeemed,
  getStaff,
  processTeamRedemption,
} from "./functions";

const app = express();
app.use(bodyParser.json());

app.get("/testing", (req: Request, res: Response) => {
  res.status(200).send("testing");
});

app.get("/staff", async (req: Request, res: Response) => {
  const query = req.query as GetStaffQuery;
  if (query.staff_id == undefined && query.team_name == undefined) {
    res
      .status(400)
      .send("please add either a staff_id or team_name to your query");
    return;
  }
  const results: Staff[] = await getStaff(query);
  res.status(200).json(results);
});

app.get("/verify-team", async (req: Request, res: Response) => {
  const query = req.query;
  if (query.team_name == undefined) {
    res.status(400).send("please add a team_name to your query");
    return;
  }
  const result = await checkTeamHasRedeemed(query.team_name as string);
  res.status(200).json({
    hasRedeemed: result,
  });
});

app.post("/redeem", async (req: Request, res: Response) => {
  const { team_name: teamName } = req.body as { team_name?: string };
  if (teamName) {
    try {
      const result = await processTeamRedemption(teamName);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send("please add a team_name to your query");
  }
});

export default app;
