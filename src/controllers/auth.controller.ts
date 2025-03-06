import { Context } from "hono";
import { supabase } from "../config/supabase";
import { sendResponse } from "../utils/response";

export const registerUser = async (c: Context) => {
  const { email, password } = await c.req.json();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return sendResponse(c, 400, { error: error.message });
  }

  return sendResponse(c, 200, {
    message: "Registration successful",
    user: data.user,
  });
};

export const loginUser = async (c: Context) => {
  const { email, password } = await c.req.json();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return sendResponse(c, 401, { error: error.message });

  return sendResponse(c, 200, { token: data.session?.access_token });
};

export const getUserProfile = async (c: Context) => {
  const user = c.get("user");
  return sendResponse(c, 200, { message: `Hello, ${user.email}!` });
};
