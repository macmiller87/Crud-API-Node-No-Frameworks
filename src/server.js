import { UserRoutes } from "./routes/user.routes.js";
import { createServer } from "node:http";

const host = process.env.HOST;
const port = process.env.PORT;

const userRoutes = new UserRoutes();

export const server = createServer(userRoutes.handler);

server.listen(port, () => { console.log(`Server is running at http://${host}:${port} 🔥🚀`) });