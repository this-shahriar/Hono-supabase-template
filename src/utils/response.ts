import { Context } from "hono";

export const sendResponse = (c: Context, status: number, data: any) => {
  return c.json(data, { status: status as any });
};
