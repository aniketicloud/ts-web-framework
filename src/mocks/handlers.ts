import { rest } from "msw";

const users = [
  {
    id: 1,
    name: "User 1",
    age: 21,
  },
  {
    id: 2,
    name: "User 2",
    age: 30,
  },
];
export const handlers = [
  // Handles http://localhost:3000/users request
  rest.get("http://localhost:3000/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
];
