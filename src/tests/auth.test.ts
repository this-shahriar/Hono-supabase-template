import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Hono } from "hono";
import request from "supertest";
import { serve } from "@hono/node-server";
import authRoutes from "../routes/auth.routes";

const app = new Hono();
app.route("/auth", authRoutes);

let server: any;

beforeAll(() => {
  server = serve({ fetch: app.fetch, port: 0 }); // Start the server on a random available port
});

afterAll(() => {
  if (server) server.close();
});

describe("Authentication API", () => {
  let testEmail = `test${Date.now()}@yopmail.com`;
  let testPassword = "Test@1234";
  let accessToken: string | null = null;

  it("should register a new user", async () => {
    const res = await request(server)
      .post("/auth/register")
      .send({ email: testEmail, password: testPassword });
    expect(res.status).toBe(200);
  });

  it("should login and return an access token", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send({ email: testEmail, password: testPassword });
    expect(res.status).toBe(200);
    accessToken = res.body.token;
  });

  it("should fetch user profile with valid token", async () => {
    const res = await request(server)
      .get("/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });

  it("should deny access without a token", async () => {
    const res = await request(server).get("/auth/me");
    expect(res.status).toBe(401);
  });
});
