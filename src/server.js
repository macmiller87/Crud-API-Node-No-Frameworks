import { UserRoutesTests } from "./tests/in-memory-app/routes/user.routesTests.js";
import { UserRoutes } from "./routes/user.routes.js";
import { createServer } from "node:http";

const host = process.env.HOST;
const port = process.env.PORT;
const testsPort = process.env.TESTS_PORT;

const userRoutes = new UserRoutes();
const userRoutesTests = new UserRoutesTests();

export const server = createServer(userRoutes.handler);
export const serverTests = createServer(userRoutesTests.handler);

serverTests.listen(testsPort);
server.listen(port, () => { console.log(`Server API is running at http://${host}:${port} 🔥🚀`) });