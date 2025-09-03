import { UserRoutes } from "./routes/user.routes.js";
import { createServer } from "node:http";

const userRoutes = new UserRoutes();

const host = process.env.HOST;
const port = process.env.PORT;

export const server = createServer(userRoutes.handler)
    .listen(port, host, () => { console.log(`Server is running at http://${host}:${port} 🔥🚀` ) });