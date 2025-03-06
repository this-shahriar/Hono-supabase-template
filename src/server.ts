import { serve } from "@hono/node-server";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(PORT),
});

console.log(`🚀 Server running on http://localhost:${PORT}`);
