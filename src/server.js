import { server } from "./app.js";

const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, () => { console.log(`Server is running at http://${host}:${port} 🔥🚀` ) });