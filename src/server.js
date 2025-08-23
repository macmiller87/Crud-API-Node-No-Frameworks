import { server } from "./app.js";

const http = server;

const host = process.env.HOST;
const port = process.env.PORT;

http.listen(port, () => { console.log(`Server is running at ${host}${port} 🔥🚀` ) });