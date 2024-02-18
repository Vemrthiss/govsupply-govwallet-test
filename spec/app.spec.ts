import request from "supertest";
import app from "../src/app";

describe("test express server start up", () => {
  test("GET /testing should be successful", () => {
    return request(app).get("/testing").expect(200);
  });
});
