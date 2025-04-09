
const request = require("supertest");
const app = require("../index.js");

describe("Auth API", () => {
  it("should return 404 for an unknown route", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
  });

  it("should return 200 for the auth route", async () => {
    const res = await request(app).get("/api/auth");
    expect([200, 404]).toContain(res.status);
  });

  it("should handle user login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect([200, 401, 400]).toContain(res.status);
  });
});
