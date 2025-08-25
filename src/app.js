import { UserRoutes } from "./routes/user.routes.js";
import { createServer } from "node:http";

const userRoutes = new UserRoutes();

export const server = createServer(userRoutes.handler);

