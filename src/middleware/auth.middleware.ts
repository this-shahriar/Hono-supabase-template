import { Context, Next } from "hono";
import { supabase } from "../config/supabase";
import { sendResponse } from "../utils/response";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return sendResponse(c, 401, { error: "Unauthorized" });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user)
    return sendResponse(c, 401, { error: "Invalid token" });

  c.set("user", data.user);
  await next();
};
