import request from "supertest";
import app from "../src/app";

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

  // it("POST /redeem with missing team_name should return status 400", async () => {
  //   const response = await request(app).post("/redeem").send({});
  //   expect(response.status).toBe(400);
  // });

  // it("POST /redeem with valid team_name should return status 200", async () => {
  //   const response = await request(app)
  //     .post("/redeem")
  //     .send({ team_name: "Team A" });
  //   expect(response.status).toBe(200);
  // });
});
