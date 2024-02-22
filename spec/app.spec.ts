import request from "supertest";
import app from "../src/app";
import * as functions from "../src/functions";

describe("test express server start up", () => {
  it("GET /testing should be successful", () => {
    return request(app).get("/testing").expect(200);
  });

  it("GET /staff with missing parameters should return status 400", async () => {
    const response = await request(app).get("/staff");
    expect(response.status).toBe(400);
  });

  it("GET /verify-team with missing parameters should return status 400", async () => {
    const response = await request(app).get("/verify-team");
    expect(response.status).toBe(400);
  });

  it("GET /verify-team with correct parameters should return status 200, with expected body", async () => {
    const mock = jest.spyOn(functions, "checkTeamHasRedeemed");
    mock.mockImplementationOnce(async () => true);

    const response = await request(app).get(
      "/verify-team?team_name=someTeamName"
    );
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      hasRedeemed: true,
    });
  });

  it("POST /redeem with missing team_name should return status 400", async () => {
    const response = await request(app).post("/redeem").send({});
    expect(response.status).toBe(400);
  });

  it("POST /redeem with valid team_name should return status 200, with expected body", async () => {
    const mock = jest.spyOn(functions, "processTeamRedemption");
    const sampleRedemption: functions.Redemption = {
      id: 0,
      team_name: "Team A",
      redeemed_at: 1000000,
    };
    mock.mockImplementationOnce(async () => [sampleRedemption]);

    const response = await request(app)
      .post("/redeem")
      .send({ team_name: "Team A" });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([sampleRedemption]);
  });
});
