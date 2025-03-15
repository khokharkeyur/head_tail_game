const request = require("supertest");
const app = require("../../index.js");

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test 1",
        email: "test1@example.com",
        password: "password123",
      });
      if (response.status === 400) {
        expect(response.body.message).toBe("User already exists");
      } else {
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully");
      }
  });

  it("should login an existing user", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "test 2",
        email: "test2@example.com",
        password: "password123",
      });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test2@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("should return 400 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
